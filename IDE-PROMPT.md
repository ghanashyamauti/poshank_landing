# Poshakh Cinematic Landing — IDE Continuation Prompt

Paste the prompt below into your coding IDE assistant when you want to continue this frontend.

```text
You are extending a premium, frontend-only landing page for Poshakh Fabrics, an Indian textile and fashion brand.

PROJECT
- Framework: TanStack Start v1, React 19, TypeScript, Vite, Tailwind CSS v4.
- Main page: src/routes/index.tsx.
- Global design and motion: src/styles.css.
- Local media: src/assets. Existing JSON files are CDN pointers and must be imported, then used through `.url`. Generated JPG files are regular ES module image imports.
- Do not add a backend, authentication, database, checkout, CMS, or admin panel unless explicitly requested.
- Keep the app frontend-only and production-ready.

VISUAL DIRECTION
- Cinematic Indian dreamscape: contemporary luxury fashion, monumental arches, lotus ponds, textile movement, palace light, Pichwai/Kalamkari-inspired botanical atmosphere.
- Editorial rather than e-commerce-grid styling. Use full-width scenes, asymmetry, visual depth, and generous breathing room.
- Existing typography is authoritative: Italiana for display, DM Sans for utility/body.
- Existing semantic CSS tokens are authoritative: ink, ivory, vermilion, moss, gold, night, and soft white. Never hardcode colors in page components.
- Avoid generic cards, pill-heavy UI, purple gradients, neon effects, glass dashboards, decorative blobs, or generic SaaS layouts.

MOTION LANGUAGE
- Motion should feel like fabric: slow, weighted, fluid, and continuous.
- Preserve the existing autoplay films, mute/play controls, scroll progress, reveal effects, depth transforms, image breathing, and glint passes.
- Any new motion must work on touch screens and degrade cleanly under prefers-reduced-motion.
- Avoid rapid zooms, scroll hijacking, excessive blur, flashing, or animation that blocks navigation.

CONTENT AND DATA
- All shopping actions currently point to https://poshakhfabrics.com/ and should remain external links unless real product URLs are supplied.
- Never invent product names, prices, discounts, stock, customer reviews, addresses, phone numbers, or heritage claims.
- If product data is supplied, store it in a typed local array shaped like:
  { id, name, category, price, image, href, description, colors }
- If a CMS or live catalogue is requested later, first ask for the exact data source/API. Do not fake a connection.
- Keep image alt text descriptive. Lazy-load every image below the first screen and always provide width and height.

ENGINEERING RULES
- Keep TanStack Router; do not add react-router-dom or an App.tsx route switcher.
- Every linked internal page must have a matching route file.
- Use semantic HTML, one H1, keyboard-accessible controls, visible focus states, and responsive layouts.
- Do not edit generated routeTree.gen.ts.
- Do not commit node_modules, dist, .git, caches, environment files, or secrets.
- Before finishing, validate at 1280px desktop and 390px mobile, check for horizontal overflow, inspect console errors, and confirm the current build is clean.

CURRENT EXPERIENCE
- Full-screen video opening with controls and 3D orbit lines.
- Story manifesto and textile-detail film.
- Craft film in a dimensional portal.
- Model portrait section.
- Three-image editorial campaign world: indigo dusk saree, ivory lotus court, vermilion palace stair.
- Collection transformation film, animated marquee, closing call-to-action, and footer.

When implementing a request, preserve this art direction and only change the requested scope. Prefer small focused edits, reuse the current tokens, and ensure the result looks intentionally art-directed on desktop and mobile.
```