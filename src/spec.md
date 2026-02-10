# Specification

## Summary
**Goal:** Fix the Terra Vedant Tech logo not displaying in the site header by ensuring the referenced static logo assets exist at the exact paths and adding a safe fallback if the image fails to load.

**Planned changes:**
- Ensure the logo files are present under `frontend/public/assets/generated/` with exact filenames/casing to match the app’s referenced paths: `/assets/generated/terravedant-logo.dim_128x128.png` and `/assets/generated/terravedant-logo.dim_512x512.png`.
- Update `frontend/src/components/SiteHeader.tsx` to render the logo resiliently (e.g., `onError` fallback to an alternate logo asset and/or a text-only brand mark) so the header remains usable if the logo image fails to load.

**User-visible outcome:** The site header reliably shows a visible Terra Vedant Tech brand mark across mobile/tablet/desktop; direct navigation to the logo asset URL returns 200 when the file exists, and the header does not look broken if the logo fails to load.
