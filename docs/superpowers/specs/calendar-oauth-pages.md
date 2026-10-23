# Google Calendar OAuth Pages Specification

## Goal

Add a public app homepage at https://kamolpop.dev/calendar and app-specific privacy policy at https://kamolpop.dev/calendar/privacy to the existing Portfolio site. The homepage links to privacy and Terms of Service at https://kamolpop.dev/calendar/terms. Serve the pages over HTTPS without login and accurately describe the current OAuth capabilities and data handling.

## Existing hosting and deployment

- Appwrite project: Personal (`6abf27de0023b9078182`). Existing site: Portfolio (`6ac15d03001869a2a791`), active, live, React static site, VCS-connected to `ArmmyC/Portfolio` on `master`.
- Build configuration: `npm install`, `npm run build`, output `./dist`, SPA fallback `index.html`.
- Current live deployment: `6ac6077109ea8f4b06e8`, ready, source commit `e179c6e323ee4650d7631a58336e2e7cffa11fee`.
- Current public requests to `/calendar`, `/calendar/privacy`, and `/calendar/terms` return HTTP 200 from the Portfolio fallback; they show the Portfolio title and do not contain the new route content. The draft routes have not been deployed.
- No Cloudflare DNS, OAuth credential, scope, or publishing-status changes have been made.

## Verified application behavior

- The active Calendar OAuth helper requests `https://www.googleapis.com/auth/calendar.events` and `https://www.googleapis.com/auth/gmail.readonly`. It sets `include_granted_scopes=true`; the actual current Google grant was not inspected and may include previously granted scopes.
- The Calendar bridge reads event IDs, titles, start/end, time zone, location, description, status, and event link from the primary calendar. Its default listing window is now through the next seven days. It can create timed events with title, start/end, optional time zone, location, and description. It does not add attendees and sets `sendUpdates="none"`.
- A separate installed Google Workspace setup utility shares the Calendar helper's OAuth client-file and token paths. It requests eight scopes: Gmail `readonly`, `send`, and `modify`; full Calendar; Drive; Contacts `readonly`; Sheets; and Docs. Its tools can search/read/send/reply to Gmail, change Gmail labels, list/create/delete calendar events, search/upload/download/share/delete Drive items, list contacts, and read/create/update spreadsheets and documents. Current source/config audit found Calendar MCP enabled in the root and research profiles, no separate Workspace MCP server, and the Workspace skill installed in the research profile; that skill can invoke broader tools when used. Server-side Codex history confirms the broader setup flow ran on October 8, 2026, saved a token, and later reported partial authentication and a failed Calendar API check. The actual granted scopes and whether that token belongs to this OAuth client remain unknown; the token contents were not inspected.
- A separate Gmail digest script uses IMAP with a different app-password file. The Calendar bridge itself does not call Gmail.
- Current Google documentation classifies the Gmail `readonly`, `send`, and `modify` scopes as restricted. Restricted-scope apps require Google verification; apps that access restricted data through a server must complete a security assessment unless an exception applies. Google OAuth policies also require encrypted token storage at rest and permanent deletion of revoked tokens.
- Read-only inspection of Google Auth Platform confirms the consent-screen app name is `Armmy Hermes Gmail Summary`; the support email is `k.kamolpopv@gmail.com`. The app is currently in Testing status. Its Branding page's homepage, privacy-policy, and terms fields are blank. The Data Access page lists `https://www.googleapis.com/auth/gmail.readonly` under restricted scopes, but does not list `calendar.events`, even though the active server OAuth helper requests both. No OAuth settings were changed.
- The public Portfolio contact is `k.kamolpopv@gmail.com`.

## Verified storage, processing, and deletion behavior

- The OAuth helper stores a JSON token at `~/.hermes/google_token.json`. The Calendar helper creates the parent directory with mode 0700 and sets the token file mode to 0600; the Workspace setup writes the same file without explicitly setting permissions. Neither helper encrypts the token at the application level. Whether the host or storage provider encrypts its disk at rest is unknown. Neither helper defines a token TTL or automatic cleanup. The Calendar bridge does not keep a separate event-history cache.
- Calendar and Gmail tool output can enter Hermes conversation state, including the state database and session transcript files. Hermes source defaults to pruning ended sessions after 90 inactive days, excluding open, pinned, and mid-turn sessions; stale automation sessions are closed first and then receive a new 90-day period. Effective live settings have not been confirmed.
- Session pruning/deletion is logical database deletion, not secure erasure. Failure-recovery spools can remain without an age limit; persistent memory has no confirmed age expiry; backup archives use separate count-based policies and may retain copies. No complete deletion/retention policy for these copies was established. Bulk session deletion may leave transcript files.
- The installed Workspace setup utility attempts Google revocation and removes the local token and pending-auth files even if remote revocation fails. The custom Calendar helper has no revoke action. Local removal does not prove that remote Google revocation succeeded. Created Google Calendar events remain in Google Calendar after revocation. Session deletion does not purge backups, recovery spools, or memory.
- Hermes is configured with the OpenAI Codex provider at `https://chatgpt.com/backend-api/codex`. The request adapter sets `store: false`, but this does not establish account-level retention, training, or deletion behavior. The owner reports using a ChatGPT Plus account; the applicable data controls are unknown.
- The existing site source imports Vercel Web Analytics. On the current Appwrite deployment, `https://kamolpop.dev/_vercel/insights/script.js` returns the site's HTML fallback (`text/html`) rather than a JavaScript analytics script, so the Vercel script is not served by the live site.

## Publication gates

- The broader setup is confirmed to have run, but the saved Google grant's scope list and OAuth client identity are unknown. Do not change scopes; describe this uncertainty accurately.
- The owner reports a ChatGPT Plus account but cannot confirm applicable data controls (training, retention, and deletion); state the unknown rather than asserting a policy.
- Server/storage-provider encryption at rest is unknown; do not claim it based only on filesystem permissions.
- Effective Hermes session-retention settings and retention/deletion for backups, recovery spools, and persistent memory are unknown; state source defaults separately from effective behavior.
- Do not claim that the app is limited to Calendar scopes while the saved grant remains uninspected. The active Calendar helper still requests Gmail read-only access.
- Review and approve the Terms of Service and the scope disclosure before deploying the public pages.

## Constraints

- Reuse the existing Portfolio site, existing Appwrite project, and `kamolpop.dev` domain.
- Do not create a second site or change Cloudflare DNS.
- Do not modify OAuth credentials, requested scopes, the current Google grant, or OAuth publishing status.
- Keep changes in the `OAuthPage` worktree; do not touch untracked files in the main Portfolio checkout.
