---
name: rjdebarras
description: Expert context for the RJ Debarras project, covering business logic, the "Digital Concierge" design system, and technical implementation (React + Cloudflare Workers + D1).
---

# RJ Debarras Skill

This skill provides comprehensive context for the **RJ Debarras** project, a premium estate clearing and debris removal service specializing in the Île-de-France (Paris) region.

## Project Vision: "The Digital Concierge"

RJ Debarras is not a "utility" service; it is a premium, empathetic companion for home transitions. The project rejects traditional "debris removal" aesthetics in favor of a sophisticated, editorial, and calm digital experience.

### Key Content Areas

1.  **[Business Logic](file:///u/flzpace/rjdebarras/.agents/skills/rjdebarras/resources/business.md)**:
    *   Lead lifecycle (New → Quoted → Done → Cancelled).
    *   Customer personas (Empathy Seeker vs. Pragmatist).
    *   Service model (Clearing, Valorization, Eco-impact).

2.  **[Technical Architecture](file:///u/flzpace/rjdebarras/.agents/skills/rjdebarras/resources/technical.md)**:
    *   Framework: React + TypeScript + Vite.
    *   Styling: Tailwind CSS v4.
    *   Backend: Cloudflare Workers + D1 Database + Telegram Notifications.
    *   SPA Routing fallbacks.

3.  **[Design System](file:///u/flzpace/rjdebarras/.agents/skills/rjdebarras/resources/design-system.md)**:
    *   Typography (Manrope & Inter).
    *   "No-Line" visual philosophy.
    *   Layering & Elevation principles.

## Use Cases for the Agent

*   **Refining UI/UX**: Always refer to the [Design System](file:///u/flzpace/rjdebarras/.agents/skills/rjdebarras/resources/design-system.md) to maintain the "Digital Concierge" aesthetic.
*   **Modifying Backend Logic**: Understand the `src/server.ts` structure and D1 interactions before adding endpoints.
*   **Managing Leads**: Access the [Business Logic](file:///u/flzpace/rjdebarras/.agents/skills/rjdebarras/resources/business.md) to understand the status transitions and tracking codes.

## Repository Layout

*   `src/components/admin`: Dashboard for lead management and logs.
*   `src/components/estimator`: Multi-step quote request tool.
*   `src/components/views/StatusView.tsx`: Customer-facing lead tracking.
*   `src/server.ts`: Cloudflare Worker API.
*   `schema.sql`: D1 database schema (leads, activity_logs).
