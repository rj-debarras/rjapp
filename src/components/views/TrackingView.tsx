import { useState, useEffect } from 'react';
import StatusView from './StatusView';
import { ShieldCheck, Phone, ArrowRight, Loader2 } from 'lucide-react';

export default function TrackingView() {
  const [loading, setLoading] = useState(true);
  const [lead, setLead] = useState<any>(null);
  const [formData, setFormData] = useState({ phone: '', code: '' });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    const isSuccessFlow = window.location.search.includes('success=true');
    try {
      const res = await fetch('/api/devis/status', {
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        setLead(data.lead);
      } else if (res.status === 401) {
        setLead(null);
        if (isSuccessFlow) {
          setError("Votre session a expiré ou n'a pas pu être initialisée. Veuillez vous connecter manuellement.");
        }
      }
    } catch (err) {
      console.error('Check status error', err);
      if (isSuccessFlow) setError("Erreur de connexion. Veuillez vous identifier manuellement.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/devis/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ 
          phone: formData.phone.replace(/\s/g, ''), 
          code: formData.code.toLowerCase().trim() 
        })
      });
      if (res.ok) {
        await checkStatus();
      } else {
        const data = await res.json();
        setError(data.error || 'Erreur d\'authentification');
      }
    } catch (err) {
      setError('Erreur réseau. Réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] gap-4">
        <Loader2 className="w-10 h-10 text-tertiary animate-spin" />
        <p className="text-outline animate-pulse font-medium">Récupération de votre dossier...</p>
      </div>
    );
  }

  if (lead) return <StatusView lead={lead} />;

  return (
    <div className="max-w-md mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
      <div className="bg-surface-container-lowest rounded-[2.5rem] p-10 shadow-ambient border border-surface-container-low text-center relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16" />
        
        <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <ShieldCheck className="w-10 h-10 text-primary" />
        </div>

        <h1 className="text-3xl font-display font-bold text-primary mb-3">Portail de Suivi</h1>
        <p className="text-outline mb-10 text-sm leading-relaxed px-4">Entrez vos accès pour consulter l'avancée de votre intervention.</p>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div className="space-y-1.5 px-1">
            <label className="text-xs font-extrabold text-outline uppercase tracking-widest">N° de téléphone</label>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline/40 group-focus-within:text-primary transition-colors" />
              <input 
                type="tel" 
                placeholder="06 -- -- -- --"
                className="w-full bg-surface-container-low focus:bg-white focus:ring-2 focus:ring-primary/20 p-4 pl-12 rounded-2xl outline-none transition-all border border-transparent focus:border-primary/30"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5 px-1">
            <label className="text-xs font-extrabold text-outline uppercase tracking-widest">Code de suivi (6 caractères)</label>
            <input 
              type="text" 
              placeholder="Ex: a7r9w2"
              className="w-full bg-surface-container-low focus:bg-white focus:ring-2 focus:ring-primary/20 p-4 rounded-2xl outline-none transition-all text-center font-mono font-bold text-xl uppercase tracking-widest border border-transparent focus:border-primary/30"
              value={formData.code}
              onChange={(e) => setFormData({...formData, code: e.target.value})}
              maxLength={6}
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium animate-in zoom-in-95 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">!</div>
              <p>{error}</p>
            </div>
          )}

          <button 
            type="submit"
            disabled={submitting}
            className="w-full bg-primary hover:bg-tertiary text-white py-4 sm:py-5 rounded-3xl font-bold text-base sm:text-lg transition-all hover:shadow-[0_10px_30px_rgba(255,107,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 active:scale-95 group mt-8 whitespace-nowrap"
          >
            {submitting ? <Loader2 className="w-5 sm:w-6 h-5 sm:h-6 animate-spin shrink-0" /> : (
              <>
                <span>Accéder à mon dossier</span>
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform shrink-0" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
