import type { D1Database } from '@cloudflare/workers-types';

export interface Env {
  DB: D1Database;
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  ADMIN_PASSWORD?: string;
  SESSION_SECRET?: string;
  ASSETS: { fetch: typeof fetch };
}

function getCorsHeaders(request: Request) {
  const origin = request.headers.get('Origin') || '*';
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

// --- Helpers ---

function generateTrackingCode(): string {
  const chars = 'abcdefghjkmnpqrstuvwxyz123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

async function logActivity(db: D1Database, action: string, details: string, request: Request) {
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  const ua = request.headers.get('user-agent') || 'unknown';
  try {
    await db.prepare('INSERT INTO activity_logs (action, details, ip, user_agent) VALUES (?, ?, ?, ?)')
      .bind(action, details, ip, ua).run();
  } catch (err) {
    console.error('Logging failed', err);
  }
}

async function getCryptoKey(secret: string) {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

async function signToken(payload: string, secret: string): Promise<string> {
  const key = await getCryptoKey(secret);
  const enc = new TextEncoder();
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  return btoa(payload) + '.' + btoa(String.fromCharCode(...new Uint8Array(signature)));
}

async function verifyToken(token: string, secret: string): Promise<string | null> {
  try {
    const [payloadB64, signatureB64] = token.split('.');
    const payload = atob(payloadB64);
    const key = await getCryptoKey(secret);
    const enc = new TextEncoder();
    const signature = new Uint8Array(atob(signatureB64).split('').map(c => c.charCodeAt(0)));
    const isValid = await crypto.subtle.verify('HMAC', key, signature, enc.encode(payload));
    return isValid ? payload : null;
  } catch {
    return null;
  }
}

async function notifyTelegram(env: Env, lead: any, leadId: number | null) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return;
  const message = [
    `🆕 *Nouveau Devis #${leadId || '?'}*`,
    `👤 *Client :* ${lead.client_name}`,
    `📞 *Tél :* ${lead.client_phone}`,
    lead.client_email ? `📧 *Email :* ${lead.client_email}` : null,
    `📍 *Code Postal :* ${lead.postal_code}`,
    ``,
    `🏠 *Type de bien :* ${lead.property_type}`,
    `📦 *Volume estimé :* ${lead.estimated_volume_m2 ? lead.estimated_volume_m2 + ' m²' : 'Non précisé'}`,
    `🏢 *Étage :* ${lead.floor_level ? lead.floor_level : 'Non précisé'}`,
    `🛗 *Ascenseur :* ${lead.has_elevator ? 'Oui' : 'Non'}`,
    `💎 *Objets de valeur :* ${lead.has_valuables ? 'Oui' : 'Non'}`,
    ``,
    `🔑 *Suivi :* \`${lead.tracking_code}\``,
  ].filter(Boolean).join('\n');

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: message, parse_mode: 'Markdown' }),
    });
    if (tgRes.ok) {
      await logActivity(env.DB, 'TELEGRAM_NOTIFY', `Notification Telegram envoyée pour le devis #${leadId || '?'}`, new Request('https://internal'));
    } else {
      const body = await tgRes.text();
      await logActivity(env.DB, 'TELEGRAM_ERROR', `Échec Telegram pour devis #${leadId || '?'} — HTTP ${tgRes.status}: ${body}`, new Request('https://internal'));
    }
  } catch (err: any) {
    console.error('Telegram failed', err);
    await logActivity(env.DB, 'TELEGRAM_ERROR', `Erreur Telegram pour devis #${leadId || '?'} — ${err?.message || err}`, new Request('https://internal'));
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const secret = env.SESSION_SECRET || 'fallback-dev-secret-jrdebarras';
    const corsHeaders = getCorsHeaders(request);

    // Handle Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 1. Submit Lead
    if (url.pathname === '/api/submit-lead' && request.method === 'POST') {
      try {
        const data = await request.json() as any;

        // Honeypot: bots fill hidden fields, real users don't
        if (data.website) {
          return new Response(JSON.stringify({ success: true }), { status: 200, headers: corsHeaders });
        }

        // Phone dedup: same phone can't submit again within 24h
        const existing = await env.DB.prepare(
          `SELECT id FROM leads WHERE client_phone = ? AND created_at > datetime('now', '-24 hours')`
        ).bind(data.client_phone).first();
        if (existing) {
          return new Response(
            JSON.stringify({ error: "Nous avons déjà reçu votre demande. Notre équipe vous recontactera sous 24h." }),
            { status: 429, headers: corsHeaders }
          );
        }

        const trackingCode = generateTrackingCode();
        
        const result = await env.DB.prepare(`
          INSERT INTO leads (property_type, estimated_volume_m2, floor_level, has_elevator, has_valuables, postal_code, client_name, client_email, client_phone, tracking_code)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          data.property_type, data.estimated_volume_m2 ?? null, data.floor_level ?? null,
          data.has_elevator ? 1 : 0, data.has_valuables ? 1 : 0, data.postal_code,
          data.client_name, data.client_email ?? null, data.client_phone, trackingCode
        ).run();

        const leadId = result.meta.last_row_id;
        const token = await signToken(String(leadId), secret);

        ctx.waitUntil(notifyTelegram(env, { ...data, tracking_code: trackingCode }, leadId));
        ctx.waitUntil(logActivity(env.DB, 'LEAD_SUBMIT', `Nouveau devis #${leadId} par ${data.client_name}`, request));

        return new Response(JSON.stringify({ success: true, trackingCode }), {
          status: 200,
          headers: {
            ...corsHeaders,
            'Set-Cookie': `session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=43200`,
          },
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
      }
    }

    // 2. Login (Tracking)
    if (url.pathname === '/api/devis/login' && request.method === 'POST') {
      const { phone, code } = await request.json() as any;
      const lead = await env.DB.prepare('SELECT id FROM leads WHERE client_phone = ? AND tracking_code = ?')
        .bind(phone, code).first() as any;

      if (!lead) {
        ctx.waitUntil(logActivity(env.DB, 'AUTH_FAILURE', `Échec connexion suivi: ${phone}`, request));
        return new Response(JSON.stringify({ error: "Code ou téléphone invalide." }), { status: 401, headers: corsHeaders });
      }

      const token = await signToken(String(lead.id), secret);
      ctx.waitUntil(logActivity(env.DB, 'AUTH_SUCCESS', `Accès suivi devis #${lead.id}`, request));
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          ...corsHeaders,
          'Set-Cookie': `session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=43200`,
        },
      });
    }

    // 2.5. Logout (Tracking)
    if (url.pathname === '/api/devis/logout' && request.method === 'POST') {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          ...corsHeaders,
          'Set-Cookie': `session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
        },
      });
    }

    // 3. Get Status
    if (url.pathname === '/api/devis/status' && request.method === 'GET') {
      const cookieHeader = request.headers.get('Cookie') || '';
      const cookies: Record<string, string> = {};
      cookieHeader.split(';').forEach(c => {
        const [k, ...v] = c.trim().split('=');
        if (k) cookies[k] = v.join('=');
      });
      const token = cookies['session'];
      
      const leadId = token ? await verifyToken(token, secret) : null;
      if (!leadId) {
        return new Response(JSON.stringify({ error: "Non autorisé" }), { 
          status: 401, 
          headers: { ...corsHeaders, 'Cache-Control': 'no-store' } 
        });
      }
      const lead = await env.DB.prepare('SELECT * FROM leads WHERE id = ?').bind(leadId).first();
      return new Response(JSON.stringify({ lead }), { status: 200, headers: corsHeaders });
    }

    // 4. Admin API
    if (url.pathname.startsWith('/api/admin/')) {
      const auth = request.headers.get('Authorization');
      
      // Strict precedence: Uses env.ADMIN_PASSWORD if set and non-empty, otherwise 'admin123'
      const expectedPassword = (env.ADMIN_PASSWORD && env.ADMIN_PASSWORD.trim().length > 0)
        ? env.ADMIN_PASSWORD 
        : 'admin123';

      if (auth !== expectedPassword) {
        ctx.waitUntil(logActivity(env.DB, 'ADMIN_AUTH_FAILURE', `Tentative non autorisée sur ${url.pathname}`, request));
        return new Response(JSON.stringify({ error: "Accès refusé" }), { status: 403, headers: corsHeaders });
      }

      // GET Leads
      if (url.pathname === '/api/admin/leads' && request.method === 'GET') {
        const { results } = await env.DB.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
        return new Response(JSON.stringify({ results }), { status: 200, headers: corsHeaders });
      }

      // DELETE Lead
      if (url.pathname.startsWith('/api/admin/leads/') && request.method === 'DELETE') {
        const id = url.pathname.split('/').pop();
        await env.DB.prepare('DELETE FROM leads WHERE id = ?').bind(id).run();
        ctx.waitUntil(logActivity(env.DB, 'LEAD_DELETE', `Devis #${id} supprimé par admin`, request));
        return new Response(JSON.stringify({ success: true }), { status: 200, headers: corsHeaders });
      }

      // UPDATE Lead Status
      if (url.pathname.includes('/api/admin/leads/') && url.pathname.endsWith('/status') && request.method === 'PATCH') {
        const id = url.pathname.split('/')[4];
        const { status } = await request.json() as any;
        const validStatuses = ['New', 'Quoted', 'Done', 'Cancelled'];
        
        if (!validStatuses.includes(status)) {
          return new Response(JSON.stringify({ error: "Statut invalide" }), { status: 400, headers: corsHeaders });
        }

        await env.DB.prepare('UPDATE leads SET status = ? WHERE id = ?').bind(status, id).run();
        ctx.waitUntil(logActivity(env.DB, 'STATUS_CHANGE', `Statut du devis #${id} passé à: ${status}`, request));
        return new Response(JSON.stringify({ success: true }), { status: 200, headers: corsHeaders });
      }

      // GET Logs
      if (url.pathname === '/api/admin/logs' && request.method === 'GET') {
        const { results } = await env.DB.prepare('SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT 200').all();
        return new Response(JSON.stringify({ results }), { status: 200, headers: corsHeaders });
      }
    }

    // 5. Default: SPA Routing — serve index.html for all non-API paths
    if (!url.pathname.startsWith('/api')) {
      if (env.ASSETS) {
        // Serve index.html for any SPA route via the ASSETS binding
        return env.ASSETS.fetch(new Request(url.origin + '/index.html'));
      }
      // Fallback: inline SPA shell that preserves the URL and loads the app
      return new Response(
        `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>JR Débarras</title><script type="module" src="/assets/index.js"></script><link rel="stylesheet" href="/assets/index.css"></head><body><div id="root"></div></body></html>`,
        { status: 200, headers: { 'Content-Type': 'text/html;charset=UTF-8' } }
      );
    }
    
    return new Response('Not found', { status: 404 });
  },
};
