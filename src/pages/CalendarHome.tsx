import { Link } from "react-router-dom";
import { CalendarPageShell } from "./CalendarPageShell";

const CalendarHome = () => (
  <CalendarPageShell
    activePage="overview"
    eyebrow="Google OAuth application"
    title="Armmy Hermes Gmail Summary"
    description="A personal Hermes assistant integration. Its active Calendar bridge lists upcoming events from the primary calendar and creates events on request; the OAuth helper also requests Gmail read-only access."
  >
    <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Active Calendar bridge
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">Calendar actions</h2>
        <ul className="mt-5 space-y-4 text-sm leading-6 text-muted-foreground">
          <li>
            <span className="font-medium text-card-foreground">Find events.</span> The Calendar
            bridge can list events from the primary calendar, by default from now through the next
            seven days. Event details include the title, times, time zone, location, description,
            status, and event link.
          </li>
          <li>
            <span className="font-medium text-card-foreground">Create an event.</span> When asked,
            it can create a timed event with a title and start and end times, plus an optional time
            zone, location, and description.
          </li>
          <li>
            <span className="font-medium text-card-foreground">No invitees are added.</span> This
            bridge's create-event call does not add attendees and sends no update notifications.
          </li>
        </ul>
      </section>

      <aside className="rounded-2xl border border-border bg-secondary/60 p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Calendar helper OAuth request
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">Requested Google scopes</h2>
        <ul className="mt-5 space-y-4 text-sm leading-6">
          <li>
            <code className="break-all rounded bg-background px-1.5 py-1 font-mono text-xs">
              https://www.googleapis.com/auth/calendar.events
            </code>
            <span className="mt-2 block text-muted-foreground">
              Lets the Calendar bridge read and create events on the primary calendar.
            </span>
          </li>
          <li>
            <code className="break-all rounded bg-background px-1.5 py-1 font-mono text-xs">
              https://www.googleapis.com/auth/gmail.readonly
            </code>
            <span className="mt-2 block text-muted-foreground">
              The Workspace skill installed in the research profile can invoke tools to search
              Gmail and read message headers, snippets, labels, and full message bodies. It can
              also send or reply to Gmail messages. The Calendar bridge itself does not call Gmail.
              The separate Gmail digest uses IMAP and a different app-password file.
            </span>
          </li>
        </ul>
        <p className="mt-5 border-t border-border/80 pt-4 text-sm leading-6 text-muted-foreground">
          This Calendar helper uses incremental authorization and asks Google to include previously
          granted scopes. The separate Workspace setup flow has been used on this server and saved
          a token; a later check reported partial authentication and a Calendar API failure. The
          current grant's scopes have not been inspected.
        </p>
      </aside>
    </div>

    <section className="mt-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
        Separate setup path
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight">Broader Google Workspace scopes</h2>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        A Workspace setup utility is installed in the same Hermes profile and can request Gmail
        read, send, and modify; full Calendar; Drive; Contacts read-only; Sheets; and Docs access.
        It shares the Calendar helper's local token and OAuth client-file paths. The inspected live
        The Calendar integration is enabled in Hermes. Its research profile also has the Workspace
        skill installed and can invoke the broader tools. The setup flow has been used and saved a token,
        but its granted scopes and OAuth client identity have not been confirmed. Since the
        Calendar helper includes previously granted scopes, the current grant may be broader than
        the two scopes listed above.
      </p>
    </section>

    <section className="mt-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="grid gap-6 md:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Processing
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">Where Google data goes</h2>
        </div>
        <div className="space-y-3 text-sm leading-6 text-muted-foreground">
          <p>
            Calendar results and results from the separate Workspace tools, if invoked, can be
            returned to the Hermes assistant and included in its conversation state. The inspected
            server configuration uses the OpenAI Codex provider, so relevant results may be sent
            to OpenAI while the assistant handles a request.
          </p>
          <p>
            The request adapter sets <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">store: false</code>;
            this setting does not establish the account's retention, training, or deletion rules.
            The operator reports using a ChatGPT Plus account, but the account's data controls have
            not been verified. See the{" "}
            <Link
              className="font-medium text-primary underline underline-offset-4"
              to="/calendar/privacy"
            >
              privacy policy
            </Link>
            {" "}for storage, retention, and deletion details, including controls that have not been
            verified.
          </p>
        </div>
      </div>
    </section>

    <p className="mt-6 text-sm text-muted-foreground">
      This page describes a personal integration. It is not a Google product or an account sign-in
      page. The app name shown on Google's consent screen is Armmy Hermes Gmail Summary.
    </p>

    <nav aria-label="Policies" className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
      <Link className="font-medium text-primary underline underline-offset-4" to="/calendar/privacy">
        Privacy policy
      </Link>
      <Link className="font-medium text-primary underline underline-offset-4" to="/calendar/terms">
        Terms of Service
      </Link>
    </nav>
  </CalendarPageShell>
);

export default CalendarHome;
