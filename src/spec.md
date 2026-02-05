# Specification

## Summary
**Goal:** Make the header branding/logo image slightly bigger across responsive breakpoints while keeping the sticky header layout aligned and overflow-free.

**Planned changes:**
- Increase the rendered size of the header logo image in `frontend/src/components/SiteHeader.tsx` across mobile/tablet/desktop breakpoints.
- Ensure the header remains vertically centered and the logo does not overlap adjacent brand text or navigation/CTA.
- Verify no horizontal overflow is introduced and the logo remains crisp with correct aspect ratio.

**User-visible outcome:** The Terra Vedant AI logo in the sticky header appears slightly larger on all devices without breaking alignment or causing any x-scroll.
