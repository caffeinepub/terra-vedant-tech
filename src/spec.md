# Specification

## Summary
**Goal:** Enlarge the site header and brand logo without breaking responsiveness, and add a documented, repeatable production preflight + deploy process.

**Planned changes:**
- Increase SiteHeader height on mobile and md+ breakpoints while preserving the existing layout (logo + brand text + nav + CTA + mobile menu).
- Increase the rendered logo size via CSS/classes only (no change to the logo image file path), ensuring alignment and no wrapping/collisions at typical desktop widths.
- Update smooth-scroll / scroll-offset behavior so navigation targets align correctly with the new header height.
- Add `frontend/DEPLOYMENT.md` with a step-by-step preflight + deployment procedure for publishing to the Internet Computer, plus a post-deploy verification checklist.
- Add a production preflight runner that fails if TypeScript compilation fails or required static assets are missing.

**User-visible outcome:** The header and logo appear larger across breakpoints without layout issues, navigation/mobile menu behavior remains correct, and developers can reliably preflight-check and deploy the app to production with documented steps.
