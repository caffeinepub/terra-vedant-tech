# Specification

## Summary
**Goal:** Fix the Facebook footer social link and prevent placeholder social URLs from behaving like broken links.

**Planned changes:**
- Update `FACEBOOK_URL` in `frontend/src/content/socialLinks.ts` from the placeholder `'#'` to a valid Facebook page URL.
- Update `frontend/src/components/SiteFooter.tsx` to treat invalid/placeholder social URLs (e.g., `'#'`, empty) as disabled (non-interactive) with a disabled visual state.
- Ensure valid Facebook and X/Twitter social links open in a new tab with `target="_blank"` and `rel="noopener noreferrer"`.

**User-visible outcome:** Clicking the Facebook icon in the footer reliably opens a real Facebook page in a new tab when configured, and any unconfigured/placeholder Facebook or X/Twitter links appear disabled and do nothing when clicked.
