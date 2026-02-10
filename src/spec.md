# Specification

## Summary
**Goal:** Replace the site’s existing logo with the user-provided logo image.

**Planned changes:**
- Add the user-provided logo as two optimized static assets (128x128 and 512x512) under `frontend/public/assets/generated`, preserving transparency if present.
- Update `frontend/src/content/brandAssets.ts` so `BRAND_ASSETS.logo.standard` and `BRAND_ASSETS.logo.large` point to the new logo asset paths.

**User-visible outcome:** The header (and any other logo usage) displays the newly uploaded logo without distortion or layout changes.
