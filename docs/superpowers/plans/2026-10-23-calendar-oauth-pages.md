# Google Calendar OAuth Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Add public /calendar, /calendar/privacy, and /calendar/terms pages to the existing kamolpop.dev Portfolio site.

**Architecture:** Add React Router pages using existing editorial tokens and emit static HTML for each route through the existing Vite prerender script. Publish through the existing Appwrite Site after the owner reviews the final scope disclosures, privacy policy, and Terms; operational facts that remain unknown stay labeled as unknown.

**Tech Stack:** React 18, TypeScript, React Router 6, Vite, Tailwind CSS, Appwrite Sites.

**Spec:** docs/superpowers/specs/calendar-oauth-pages.md

## Global Constraints

- Use only the existing Appwrite Portfolio site and kamolpop.dev.
- Do not create another site, change Cloudflare DNS, or edit OAuth credentials/scopes/status.
- Base public copy on verified code and user-confirmed policy facts.
- Keep public copy limited to verified behavior and explicit unknowns. The broader Workspace setup is confirmed to have run and saved a token; its actual grant and client identity are unknown. ChatGPT Plus is owner-reported, but data controls, disk encryption, and effective retention/deletion remain unverified. The consent-screen name is `Armmy Hermes Gmail Summary`. Do not change OAuth scopes or settings. Obtain owner review of the Terms and scope disclosure before deploying.

## File structure

- src/App.tsx: register the three routes above the catch-all route.
- src/pages/CalendarPageShell.tsx: shared responsive editorial layout and navigation.
- src/pages/CalendarHome.tsx: app purpose, actual Calendar actions, scope summary, and links to privacy and terms.
- src/pages/CalendarPrivacy.tsx: access, use, storage, sharing, retention, and deletion disclosures.
- src/pages/CalendarTerms.tsx: draft terms required by Google OAuth homepage guidance.
- prerender.mjs: generate static documents with route-specific canonical/title/description metadata.
- src/test/calendar-pages.test.tsx: route and policy-link regression coverage.
- docs/superpowers/specs/calendar-oauth-pages.md: verified facts and publication constraints.

### Task 1: Route behavior tests

The route test was first run against the original state and failed because the routes did not exist. A green run remains optional unless requested; production build and static output checks are recorded separately.

### Task 2: Implement pages and routes

- [x] Add /calendar and /calendar/privacy before the catch-all.
- [x] Use existing background, foreground, primary, border, card, and typography tokens.
- [x] Describe confirmed Calendar read/create behavior and show OAuth scopes.
- [x] Distinguish the enabled Calendar helper scopes from the separate installed Workspace setup scopes and their Gmail capabilities.
- [x] Add /calendar/terms and a visible Terms link following Google's current policy.
- [x] Disclose unresolved operational details as unknown; do not claim encryption, complete deletion, or a fixed retention period.

### Task 3: Prerender route documents

- [x] Render route-specific documents under dist/calendar/, dist/calendar/privacy/, and dist/calendar/terms/.
- [x] Add route-specific canonical URLs, titles, descriptions, and prerender markers.
- [x] npm run build succeeds; generated HTML was checked for markers and route metadata.

### Task 4: Publish through the existing Appwrite Site

- [ ] Review the public scope, privacy, and Terms copy with the site owner, preserving explicit unknowns.
- [ ] Publish a deployment of the existing Portfolio site without changing its domain or OAuth configuration.
- [ ] Verify the homepage, privacy policy, and Terms URL over HTTPS without login.
