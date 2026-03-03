# Specification

## Summary
**Goal:** Add a personalized dashboard for authenticated users (logged in via Internet Identity) that displays their activity metrics and saved preferences, backed by per-user data stored in the Motoko backend.

**Planned changes:**
- Update the Motoko backend actor to store per-principal records with visit count, last login timestamp, and a user-configurable preference (e.g., display name); expose update and query functions for these fields with stable storage across upgrades
- Add React Query hooks in `frontend/src/hooks/useQueries.ts` for fetching dashboard data and a mutation hook for updating preferences
- Add a dashboard UI section that is only rendered for authenticated users, showing a welcome message with the user's principal ID, visit count, last login timestamp, and a preference field the user can edit
- Unauthenticated users see no dashboard content

**User-visible outcome:** Returning visitors who log in via Internet Identity will see a personalized dashboard showing their activity history and can set and retrieve a saved preference that persists across sessions.
