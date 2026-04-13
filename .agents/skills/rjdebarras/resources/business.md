# Business Logic: RJ Debarras

The business operates as a premium property clearing and debris removal service in the Île-de-France region. The mission is to remove physical and emotional burdens for individuals in transitions (moving, estate clearing, hoarding).

## Core Service Model
- **Estate Clearing (Débarras)**: Complete clearing of apartments, houses, and storage units.
- **Valorization (Rémunéré)**: Potential to credit the value of items (furniture, antiques) against the clearing cost.
- **Eco-impact**: Systematic sorting and recycling to reduce environmental footprint.

## Lead Lifecycle
A "Lead" (Devis) flows through the following states in the `admin` dashboard:
1.  **New (Nouveau)**: Request submitted via the frontend cost estimator.
2.  **Quoted (Devis)**: Admin has reviewed and provided an estimate to the client.
3.  **Done (Terminé)**: Clearing is complete.
4.  **Cancelled (Annulé)**: Request rejected or withdrawn.

## Customer Tracking
Clients receive a **Tracking Code** (e.g., `RJ-X123YZ`) upon submission. They can use this, along with their phone number, to check their status on the `/devis` route.

## User Personas
| Persona | Cares about | Challenge | Value |
|---------|-------------|-----------|-------|
| Empathy Seeker (Family) | Respect and careful handling | Overwhelmed by volume, emotionally attached | Handled delicately without judgment |
| The Pragmatist (Executor) | Speed and clear pricing | Emptyting to list for sale | Quick, transparent estimation & execution |

## Critical Logic
- **Telegram Notifications**: New leads trigger immediate alerts via the Telegram bot API.
- **Audit Logging**: Every admin action (status update, deletion) is logged in the `activity_logs` table for compliance and transparency.
