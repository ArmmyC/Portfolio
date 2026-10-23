import { Link } from "react-router-dom";
import { CalendarPageShell } from "./CalendarPageShell";

const CalendarTerms = () => (
  <CalendarPageShell
    activePage="terms"
    eyebrow="Google Workspace integration"
    title="Terms of Service"
    description="Terms for the personal Google Calendar integration."
  >
    <div className="mt-10 max-w-3xl space-y-5">
      <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          01 / Service
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">What the integration does</h2>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          The active Calendar bridge connects a Google account to the Hermes assistant. It can
          list upcoming events and create a timed event when asked; it does not add attendees to
          new events. The Calendar helper also requests Gmail read-only access. A Workspace skill
          installed in the research profile can invoke Gmail search, read, send, and reply tools. A
          separate Workspace setup utility can request broader Gmail, Calendar, Drive, Contacts,
          Sheets, and Docs scopes; that flow has been used but the saved token's actual granted
          scopes are unconfirmed. See the privacy policy for the requested scope list and current
          configuration status.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          02 / Account access
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">Google account permissions</h2>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          You should connect only a Google account you own or are authorized to manage. Calendar
          access is granted through Google's authorization flow. If that permission is revoked,
          Calendar features that depend on it may stop working.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          03 / Data and contact
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">Read the privacy policy</h2>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          The <Link className="font-medium text-primary underline underline-offset-4" to="/calendar/privacy">privacy policy</Link>{" "}
          describes the Google data the integration can access and how it is processed. It also
          identifies granted-scope, retention, deletion, and security details that have not been
          verified.
        </p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          For questions, contact Kamolpop Vitayarat at{" "}
          <a className="font-medium text-primary underline underline-offset-4" href="mailto:k.kamolpopv@gmail.com">
            k.kamolpopv@gmail.com
          </a>
          , the public contact listed on the Portfolio website.
        </p>
      </section>

      <p className="text-sm text-muted-foreground">
        <Link className="font-medium text-primary underline underline-offset-4" to="/calendar">
          Back to calendar overview
        </Link>
      </p>
    </div>
  </CalendarPageShell>
);

export default CalendarTerms;
