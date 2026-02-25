# Specification

## Summary
**Goal:** Update the site-wide Facebook social link URL to the provided profile link.

**Planned changes:**
- Change the `FACEBOOK_URL` constant in `frontend/src/content/socialLinks.ts` to `https://www.facebook.com/profile.php?id=61587955444489&name=xhp_nt__fb__action__open_user`.
- Ensure the footer’s Facebook icon link uses the updated `FACEBOOK_URL` and is treated as a valid link that opens in a new tab.

**User-visible outcome:** Clicking the Facebook icon in the site footer opens the updated Facebook profile page in a new browser tab.
