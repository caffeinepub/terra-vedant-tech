# Specification

## Summary
**Goal:** Publish the current app version to production by ensuring the frontend builds cleanly and all referenced static assets resolve correctly.

**Planned changes:**
- Run production preflight checks and fix any frontend build/type errors blocking a production build.
- Verify all UI-referenced static assets exist and are served at correct absolute `/assets/...` paths (including the header logo and any `/assets/generated/...` images).
- Deploy the built frontend to production on the Internet Computer and verify the deployed site renders correctly (header/sections/footer) with the header logo visible.

**User-visible outcome:** The production site loads reliably (no blank screen), renders the full page (header, sections, footer), and displays the logo correctly in the header without broken asset links.
