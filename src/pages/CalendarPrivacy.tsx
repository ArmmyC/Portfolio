import { Link } from "react-router-dom";
import { CalendarPageShell } from "./CalendarPageShell";
import { useCalendarRoutes } from "./useCalendarRoutes";

const CalendarPrivacy = () => {
  const routes = useCalendarRoutes();

  return (
  <CalendarPageShell
    activePage="privacy"
    eyebrow="Google Workspace integration"
    title="Privacy policy"
    description="Privacy policy for Armmy Hermes Gmail Summary, the Google OAuth app used by a personal Hermes integration. It explains the requested Google access, data handling, and operational details that have not been verified."
  >
    <div className="mt-10 space-y-5">
      <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          01 / Access
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">Google data this integration can access</h2>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          This integration is used by its operator for a personal Google account. The OAuth helper
          requests{" "}
          <code className="break-words rounded bg-muted px-1 py-0.5 font-mono text-xs">https://www.googleapis.com/auth/calendar.events</code>{" "}
          and <code className="break-words rounded bg-muted px-1 py-0.5 font-mono text-xs">https://www.googleapis.com/auth/gmail.readonly</code>.
          Google defines <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">calendar.events</code> as permission to view and edit events on all calendars
          the user can access, though this bridge currently uses only the primary calendar.
          <code className="ml-1 rounded bg-muted px-1 py-0.5 font-mono text-xs">gmail.readonly</code>
          permits reading Gmail messages and settings, not sending. The helper asks Google to
          include previously granted scopes, so the current account grant may
          include scopes beyond this helper's requested list. Server-side history confirms that
          the separate Workspace setup flow was used and saved a token. A later check reported
          partial authentication and a Calendar API failure. The token's exact granted scopes, and
          whether it belongs to this OAuth client, have not been confirmed.
        </p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          The Calendar bridge can list event IDs, titles, start and end times, time zone, location,
          description, status, and event links from the primary calendar. Its default listing window
          is now through the next seven days. When asked, it can create a timed event with a title,
          times, and optional time zone, location, and description. It does not add attendees and
          sends no update notifications.
        </p>
        <div className="mt-5 rounded-xl bg-muted p-4 text-sm leading-6">
          <p className="font-medium">A Workspace skill is installed in the research profile.</p>
          <p className="mt-2 text-muted-foreground">
            The Calendar helper requests <code className="rounded bg-background px-1 py-0.5 font-mono text-xs">gmail.readonly</code>,
            which permits reading Gmail messages and settings but not sending. If the actual grant
            includes the separate Workspace <code className="rounded bg-background px-1 py-0.5 font-mono text-xs">gmail.send</code> or <code className="rounded bg-background px-1 py-0.5 font-mono text-xs">gmail.modify</code> scope,
            tools from the installed skill can send or reply to messages. The saved grant is
            unverified. The Calendar bridge itself does not call Gmail. A separate Gmail digest
            uses IMAP with a different app-password file; that is separate from the Gmail OAuth
            scope.
          </p>
        </div>
        <div className="mt-5 border-t border-border/80 pt-5">
          <h3 className="text-lg font-semibold tracking-tight">A separate Workspace setup path</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            An installed Workspace setup utility uses the same Hermes token and OAuth client-file
            paths. Its authorization flow can request a broader set of scopes:
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 sm:grid-cols-2">
            <li><code className="break-all rounded bg-muted px-1 py-0.5 font-mono text-xs">https://www.googleapis.com/auth/gmail.readonly</code></li>
            <li><code className="break-all rounded bg-muted px-1 py-0.5 font-mono text-xs">https://www.googleapis.com/auth/gmail.send</code></li>
            <li><code className="break-all rounded bg-muted px-1 py-0.5 font-mono text-xs">https://www.googleapis.com/auth/gmail.modify</code></li>
            <li><code className="break-all rounded bg-muted px-1 py-0.5 font-mono text-xs">https://www.googleapis.com/auth/calendar</code></li>
            <li><code className="break-all rounded bg-muted px-1 py-0.5 font-mono text-xs">https://www.googleapis.com/auth/drive</code></li>
            <li><code className="break-all rounded bg-muted px-1 py-0.5 font-mono text-xs">https://www.googleapis.com/auth/contacts.readonly</code></li>
            <li><code className="break-all rounded bg-muted px-1 py-0.5 font-mono text-xs">https://www.googleapis.com/auth/spreadsheets</code></li>
            <li><code className="break-all rounded bg-muted px-1 py-0.5 font-mono text-xs">https://www.googleapis.com/auth/documents</code></li>
          </ul>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            When invoked, tools from that setup can send or reply to Gmail, change Gmail labels,
            access and modify Calendar and Drive items, list Contacts, and read or edit
            Sheets and Docs. The Calendar integration is enabled in Hermes. Its research profile
            also has the Workspace skill installed and can invoke the broader tools when used. The
            broader setup flow was run and saved a token; its exact granted scopes and whether it
            used this app's OAuth client are unconfirmed. Because the Calendar helper includes
            previously granted scopes, this policy does not claim that access is limited to the
            Calendar helper's two requested scopes.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          02 / Use and sharing
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">How Google data is used</h2>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          Calendar data is used to answer requests about upcoming events and to create an event when
          asked. If the installed Workspace skill is invoked, its tools can search or read Gmail,
          send or reply to messages, and access other Workspace services covered by its requested
          scopes. Returned tool results become part of the Hermes assistant's conversation
          processing.
        </p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          The inspected server configuration uses the OpenAI Codex provider at the ChatGPT Codex
          endpoint. The operator reports using a ChatGPT Plus account for this endpoint. Google
          data included in a request may therefore be transmitted to OpenAI for processing. The
          request adapter sets <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">store: false</code>,
          but that request option alone does not establish the retention, training, or deletion
          rules that apply to this sign-in. The account's data controls have not been verified. No
          other recipient was established from the inspected integration code.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          03 / Storage
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">Credentials and assistant records</h2>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          The OAuth helper stores the token as JSON at <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">~/.hermes/google_token.json</code>.
          The Calendar helper creates the parent directory with mode 0700 and sets the token file
          to mode 0600. The separate Workspace setup writes to the same token path without
          explicitly setting file permissions. Neither helper encrypts the token at the application
          level; encryption by the server's disk or storage provider has not been established. The
          Calendar bridge does not keep a separate event-history cache.
        </p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Calendar and Gmail results may also be stored in Hermes session records: the state
          database holds message and tool content, and session transcript files may contain the
          same conversation. Hermes source defaults to pruning ended sessions after 90 inactive
          days; open, pinned, and mid-turn sessions are excluded. Stale automation sessions are first
          closed and then receive their own 90-day period. The live effective retention settings
          have not been confirmed.
        </p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Neither OAuth helper defines a token time-to-live or automatic cleanup. The local token
          remains until replaced, revoked, or manually removed.
        </p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Pruning deletes database rows and attempts to remove associated files, but it is logical
          deletion rather than a secure-erasure guarantee. Backups, failure-recovery spools, and
          persistent memory have separate handling; no age-based expiry or complete deletion
          process for those copies was established. Their effective retention periods are unknown.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          04 / Revocation and deletion
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">Removing access and stored data</h2>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          The installed Google Workspace setup utility has a revoke option that attempts to revoke
          the Google grant and removes the local token and pending-auth files even if remote
          revocation fails. The custom Calendar helper has no revoke action, and removal of the
          local file does not prove that Google's remote grant was revoked. A specific Hermes
          session can be deleted from the CLI or dashboard; bulk
          deletion can leave transcript files for later cleanup. These actions do not purge
          existing backups, recovery spools, persistent memory, or data already sent to a model
          service. Events already created remain in Google Calendar and must be removed there.
        </p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          There is no verified single action that deletes every copy of Google data from this
          integration. Contact the operator for a deletion request and to review which copies can
          be removed.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Operational limits
        </p>
        <h2 className="mt-3 text-xl font-semibold tracking-tight">Details not verified</h2>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          The operator has not confirmed whether the server storage is encrypted at rest, the
          effective Hermes retention settings, or the retention of backups, recovery spools, and
          persistent memory. The data controls that apply to the OpenAI Codex account have also not
          been verified. No encryption, complete-deletion, or fixed-retention guarantee is made for
          those items. Contact the operator for current information.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight">Contact</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          For questions or a data-deletion request, contact Kamolpop Vitayarat at{" "}
          <a className="font-medium text-primary underline underline-offset-4" href="mailto:k.kamolpopv@gmail.com">
            k.kamolpopv@gmail.com
          </a>
          . This contact address is listed on the Portfolio website.
        </p>
      </section>

      <p className="text-sm text-muted-foreground">
        <Link className="font-medium text-primary underline underline-offset-4" to={routes.overview}>
          Back to calendar overview
        </Link>
      </p>
    </div>
  </CalendarPageShell>
  );
};

export default CalendarPrivacy;
