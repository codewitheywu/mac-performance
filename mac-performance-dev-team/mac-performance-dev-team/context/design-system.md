# Design System

Direction: a real performance garage, not a tech startup. The site should look like it was designed for this shop specifically, by someone who has been inside one.

## Foundations

- **Background:** pure black `#000`. Surfaces layered with low-opacity white, not gray hex values.
- **Text:** white for primary; reduced-opacity white for secondary. Secondary text must still pass WCAG AA on its actual background.
- **Accents:** racing red and electric amber/yellow. Red = primary action and active state. Amber = data highlights (specs, counts, status). Neither is used as a large background fill.
- **Type:** Bebas Neue for display/headings (uppercase, slightly tracked), Montserrat for body and UI. Use tabular numerals for prices, specs, and stats.
- **Tokens:** defined once in CSS via Tailwind v4 `@theme`. Components use tokens, never raw hex.
- **Density:** compact. Tight vertical rhythm, restrained radii, nothing oversized for its content.

## Surfaces

- Bento grid layout for feature sections.
- One glass for the whole site: the `glass-card` utility in `globals.css`, with a dark base for legibility and a lit gold edge. Adjust it per use with `--glass-tint` and check contrast over the brightest photo behind it.
- Glass always sits over a photo or a light beam. Over flat black, blur is invisible and wastes GPU.
- Panels overlap photos instead of sitting beside them. Never over the MAC logo on the sign.
- One elevation style across the site. Do not mix glass, solid, and shadowed cards in the same section.

## Locked decisions

Do not change without explicit owner approval:

- Hero: no red glow; keep the black left fade over the hero image.
- Slanted gold light on every section, approved by the project lead, all on one 112° angle, mirrored on alternate sections. Thin lines (`hero-flare`) sit on plain black only: over a photo they read as scratches. Soft shafts (`beam-flare`) may cross photos. Never a round core: it reads as an eye. Red never glows.
- Gold (`--color-gold`) is the premium accent: hairlines, links, secondary buttons and the rating.
- Repair card: no background image.
- CTA card: no red background.
- Navbar: sticky.

## Anti-generic rules

The following patterns make a site look template- or AI-generated. They are not allowed:

| Not allowed | Do instead |
|---|---|
| Purple/indigo/blue gradients, gradient text on headings | Solid white headings; accent color on one word or a hairline rule at most |
| Neon glow, blurred color blobs, animated orbs behind content | Real photography of the shop, cars, and parts; black space; slanted gold light |
| Three identical icon cards in a row ("Fast. Reliable. Affordable.") | Cards with real content: service name, what it includes, price or "from" price from DB |
| Emoji or sparkle icons as decoration | One consistent icon set, used only when the icon adds meaning |
| Generic copy: "Elevate", "Unleash", "Seamless", "Next-level", "Your journey" | Plain, specific shop language: what the service is, what car, how long, how much |
| Invented stats, testimonials, logos, or awards | Only data from the database or the live Google rating; omit the section if empty |
| Everything centered, every section the same height | Left-aligned text blocks, deliberate asymmetry in the bento grid |
| `rounded-3xl` and large shadows on everything | Small radius, consistent; borders over shadows |
| Hover effects that scale, glow, and tilt at once | One subtle state change (border or opacity), respects reduced motion |
| Stock photos of smiling mechanics, AI-generated car images | Owner-supplied photos; if none exist, use a neutral placeholder and flag it |

## Motion

- Purposeful only: state feedback, menu open/close, content reveal at most once per section.
- Durations short (150–250ms), easing consistent. Light passes and photo drift may run longer, and never loop.
- Everything disabled or reduced under `prefers-reduced-motion`.
