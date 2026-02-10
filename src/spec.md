# Specification

## Summary
**Goal:** Replace the site’s current logo with the user-provided Terravedant logo across the app.

**Planned changes:**
- Generate optimized square logo assets based on `IMG-20260210-WA0045-1.jpg` and add them under `frontend/public/assets/generated` in sizes 128x128 and 512x512.
- Update `frontend/src/content/brandAssets.ts` so `BRAND_ASSETS.logo.standard` and `BRAND_ASSETS.logo.large` point to the new logo asset paths.
- Ensure the site header uses `BRAND_ASSETS.logo.standard` and that the logo displays correctly on mobile and desktop without stretching/cropping.

**User-visible outcome:** The website header displays the new Terravedant logo consistently across screen sizes.
