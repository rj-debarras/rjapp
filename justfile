# Justfile for JR Débarras Development

# Default command: List available tasks
default:
	@just --list

# Start the Vite development server (frontend only)
dev:
	npm run dev

# Build the project for production
build:
	npm run build

# Sync production secrets and deploy to Cloudflare
deploy: vars-sync build
	npx wrangler deploy

# Start the Cloudflare Pages local development server (with Functions & D1)
preview: build
	npx wrangler pages dev dist

# Initialize the local D1 SQLite database with the schema
db-init:
	npx wrangler d1 execute rj-debarras-db --local --file=./schema.sql

# Initialize the production D1 SQLite database with the schema (CAUTION: Modifies remote database)
db-init-prod:
	npx wrangler d1 execute DB --remote --file=./schema.sql

# Sync production secrets from .prod.vars to Cloudflare (Worker backend only)
vars-sync:
	#!/usr/bin/env bash
	if [ ! -f .prod.vars ]; then
		echo "❌ .prod.vars not found. Copy .prod.sample and fill in your secrets."
		exit 1
	fi
	echo "🚀 Syncing backend secrets to Cloudflare..."
	npx wrangler secret bulk .prod.vars

# View all leads currently in the local D1 database
db-leads:
	npx wrangler d1 execute rj-debarras-db --local --command="SELECT * FROM leads"

# Open the Telegram bot chat CLI
chat:
	node chat.mjs

# Install all project dependencies
install:
	npm install

# Open a subshell with GitHub & Cloudflare credentials loaded from .credentials
# Credentials are only available inside this shell — type `exit` to leave
login:
	#!/usr/bin/env bash
	set -euo pipefail
	if [ ! -f .credentials ]; then
		echo "❌ .credentials not found. Copy .credentials.sample and fill in your values."
		exit 1
	fi
	source .credentials
	if [ -z "${GITHUB_USER:-}" ] || [ -z "${GITHUB_TOKEN:-}" ]; then
		echo "❌ GITHUB_USER or GITHUB_TOKEN is empty in .credentials"
		exit 1
	fi
	export GIT_ASKPASS=$(mktemp)
	cat > "$GIT_ASKPASS" <<'HELPER'
	#!/bin/sh
	echo "$GITHUB_TOKEN"
	HELPER
	chmod +x "$GIT_ASKPASS"
	
	# Export Git Identity
	export GIT_AUTHOR_NAME="${GITHUB_NAME}"
	export GIT_AUTHOR_EMAIL="${GITHUB_EMAIL}"
	export GIT_COMMITTER_NAME="${GITHUB_NAME}"
	export GIT_COMMITTER_EMAIL="${GITHUB_EMAIL}"
	
	# Export Cloudflare credentials for Wrangler remote commands
	export CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN:-}"
	export CLOUDFLARE_ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:-}"
	
	export GITHUB_USER GITHUB_TOKEN
	echo "🔐 Shell active as '$GITHUB_USER' ($GITHUB_NAME) + Cloudflare. Type 'exit' to leave."
	PROMPT="(dev:$GITHUB_USER) %~ $ " zsh -i || true
	rm -f "$GIT_ASKPASS"
	echo "🔒 Credentials cleared."
