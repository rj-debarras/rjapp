# Design System: RJ Debarras

The project is defined by its **"Digital Concierge"** creative north star, prioritizing empathy, structural clarity, and a premium editorial look.

## Creative North Star
Modern estate clearing is often a stressful experience. The "Digital Concierge" aesthetic aims to bring calm and professional order through:
-   **Intentional Asymmetry**: Text blocks offset against large-scale imagery.
-   **Tonal Depth**: Using surface hierarchy and breathing room over information density.
-   **Sophistication**: Rejecting the "cheap utility" template look.

## Colors & Surfaces
-   **Primary (#00081E)**: Deep Blue, used for maximum authority and readability in headlines.
-   **Secondary (#006A60)**: Forest Green, representing eco-conscious and reassuring growth.
-   **Tertiary/CTA (#FFB780)**: Electric Orange, a warm beacon for conversion and action.
-   **Surface Architecture**: Surfaces are stacked like sheets of fine paper (`surface-container-low` vs. `surface-container-high`) instead of using 1px borders.

## Typography
-   **Display & Headlines**: **Manrope**. Bold, wide-set, authoritative, and sophisticated.
-   **Body & Utility**: **Inter**. High legibility for accessibility.

## Design Principles
1.  **The "No-Line" Rule**: Eliminate 1px solid borders. Boundaries are defined by background shifts and vertical spacing.
2.  **Elevation via Layering**: Natural depth is achieved by stacking surface colors rather than using heavy digital shadows.
3.  **Physical Presence**: Ambient shadows (e.g., 32px blur, 6% opacity) are used to mimic natural light for floating elements.

## Component Patterns
-   **Buttons**: XL (1.5rem) rounded corners. Primary CTAs use a weighted premium look (gradients).
-   **Inputs**: `surface-container-lowest` backgrounds with subtle 2px bottom bars on focus.
-   **Feedback**: Negative states use empathetic error container colors instead of harsh red signals.

## Interactive Experience
-   **Glassmorphism**: Floating navigation and primary CTAs use `backdrop-blur: 12px` and 80% opacity for a modern, premium feel.
-   **Mobile First**: Interactions are optimized for touch with minimum hit areas of 48px.
