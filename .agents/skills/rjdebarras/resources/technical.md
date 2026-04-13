# Technical Architecture: RJ Debarras

The project is built as a **Full-Stack Single Page Application (SPA)** with a **Cloudflare Workers** backend.

## Tech Stack
-   **Frontend**: React 19, TypeScript, Vite.
-   **Backend**: Cloudflare Worker (`src/server.ts`).
-   **Database**: Cloudflare D1 (SQL).
-   **Styling**: Tailwind CSS v4.
-   **Icons**: Lucide-React.
-   **Deployment**: Wrangler.

## Backend Infrastructure
The Cloudflare Worker handles all API requests under the `/api` prefix.

### Key API Endpoints
-   `POST /api/submit-lead`: Accepts lead data, generates a tracking code, and notifies Telegram.
-   `POST /api/devis/login`: Authenticates lead tracking for clients.
-   `GET /api/devis/status`: Fetches current status for an authenticated lead.
-   `GET /api/admin/leads`: (Protected) Fetches all leads for the admin dashboard.
-   `PATCH /api/admin/leads/:id/status`: (Protected) Updates the status of a lead.
-   `GET /api/admin/logs`: (Protected) Fetches activity logs.

### Database Schema (D1)
-   `leads`: `id`, `property_type`, `estimated_volume_m2`, `floor_level`, `has_elevator`, `has_valuables`, `postal_code`, `client_name`, `client_email`, `client_phone`, `tracking_code`, `status` (New, Quoted, Done, Cancelled), `created_at`.
-   `activity_logs`: `id`, `action`, `details`, `ip`, `user_agent`, `created_at`.

## Admin Authentication
-   **Persistence**: Admin sessions are persistent across browser refreshes using `sessionStorage`.
-   **Authorization**: API requests are protected via an `Authorization` header containing the admin password.

## SPA Routing & Fallbacks
The Worker is configured to serve `index.html` for any route that does **not** match an API endpoint. This enables standard client-side routing (e.g., `/devis`, `/admin`) to function correctly in production.

## Notifications
Uses the **Telegram Bot API** for real-time lead alerts. Configuration requires `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` environment variables.
