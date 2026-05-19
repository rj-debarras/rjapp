#!/usr/bin/env node
// Telegram chat CLI — converse as the bot
// Usage: node chat.mjs [--chat-id <id>]

import { Bot } from "grammy";
import * as p from "@clack/prompts";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createInterface } from "readline";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Load .prod.vars ───────────────────────────────────────────────────────────

function loadVars(file) {
  try {
    return Object.fromEntries(
      readFileSync(resolve(__dirname, file), "utf8")
        .split("\n")
        .filter((l) => l.trim() && !l.startsWith("#"))
        .map((l) => {
          const idx = l.indexOf("=");
          return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
        })
        .filter(([k, v]) => k && v)
    );
  } catch {
    return {};
  }
}

const vars = { ...loadVars(".prod.vars"), ...loadVars(".dev.vars") };
const TOKEN = process.env.TELEGRAM_BOT_TOKEN || vars.TELEGRAM_BOT_TOKEN;

const chatIdArg = process.argv.indexOf("--chat-id");
const CHAT_ID = chatIdArg !== -1
  ? process.argv[chatIdArg + 1]
  : process.env.TELEGRAM_CHAT_ID || vars.TELEGRAM_CHAT_ID;

if (!TOKEN) { p.log.error("TELEGRAM_BOT_TOKEN not found"); process.exit(1); }
if (!CHAT_ID) { p.log.error("TELEGRAM_CHAT_ID not found (or pass --chat-id <id>)"); process.exit(1); }

// ── Bot setup (grammY) ────────────────────────────────────────────────────────

const bot = new Bot(TOKEN);

// ── Terminal colours (for the chat history display) ───────────────────────────

const C = {
  reset:  "\x1b[0m",
  bold:   "\x1b[1m",
  dim:    "\x1b[2m",
  cyan:   "\x1b[36m",
  green:  "\x1b[32m",
};

function ts() {
  return new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

// Prints an incoming message without breaking the current readline prompt
let currentRl = null;

function printMsg(sender, text, color) {
  const line = `${C.dim}[${ts()}]${C.reset} ${color}${C.bold}${sender}${C.reset}: ${text}`;
  if (currentRl) {
    // Temporarily erase the prompt line, print the message, restore prompt
    process.stdout.write("\r\x1b[K");
    console.log(line);
    currentRl.prompt(true);
  } else {
    console.log(line);
  }
}

// ── Message loop ──────────────────────────────────────────────────────────────

async function startChat(botUsername) {
  p.intro(`Telegram Chat — @${botUsername} → chat ${CHAT_ID}`);
  p.log.info("Type a message and press Enter. Ctrl+C to quit.");
  console.log();

  // Register incoming-message handler
  bot.on("message:text", (ctx) => {
    if (String(ctx.chat.id) !== String(CHAT_ID)) return;
    const name = [ctx.from.first_name, ctx.from.last_name].filter(Boolean).join(" ");
    printMsg(name, ctx.message.text, C.cyan);
  });

  // Start grammY long-polling in background (does not block)
  // "Aborted delay" is grammY's internal stop signal — not a real error
  bot.start({ onStart: () => {} }).catch((e) => {
    if (!e.message?.includes("Aborted")) throw e;
  });

  // Readline for sending
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `${C.green}${C.bold}Bot${C.reset} > `,
  });
  currentRl = rl;
  rl.prompt();

  rl.on("line", async (line) => {
    const text = line.trim();
    if (!text) { rl.prompt(); return; }
    rl.pause();
    try {
      await bot.api.sendMessage(CHAT_ID, text);
      printMsg(`@${botUsername}`, text, C.green);
    } catch (e) {
      p.log.error(`Send failed: ${e.message}`);
    }
    rl.resume();
    rl.prompt();
  });

  async function quit() {
    currentRl = null;
    process.stdout.write("\n");
    await bot.stop();
    p.outro("Bye.");
    process.exit(0);
  }

  rl.on("close", quit);
  process.on("SIGINT", quit);
  process.on("SIGTERM", quit);
}

// ── Entry point ───────────────────────────────────────────────────────────────

const me = await bot.api.getMe();
await startChat(me.username);
