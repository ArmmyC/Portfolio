import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useCalendarRoutes } from "./useCalendarRoutes";

type CalendarPageShellProps = {
  activePage: "overview" | "privacy" | "terms";
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function CalendarPageShell({
  activePage,
  eyebrow,
  title,
  description,
  children,
}: CalendarPageShellProps) {
  const routes = useCalendarRoutes();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-background px-4 py-3 text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <div className="border-b border-border/80">
        <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link to={routes.overview} className="text-sm font-semibold tracking-tight text-foreground">
            Kamolpop Vitayarat
            <span className="ml-2 font-normal text-muted-foreground">Personal site</span>
          </Link>
          <nav aria-label="Calendar pages" className="flex items-center gap-5 text-sm">
            <Link
              to={routes.overview}
              aria-current={activePage === "overview" ? "page" : undefined}
              className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline aria-[current=page]:font-semibold aria-[current=page]:text-foreground"
            >
              Overview
            </Link>
            <Link
              to={routes.privacy}
              aria-current={activePage === "privacy" ? "page" : undefined}
              className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline aria-[current=page]:font-semibold aria-[current=page]:text-foreground"
            >
              Privacy policy
            </Link>
            <Link
              to={routes.terms}
              aria-current={activePage === "terms" ? "page" : undefined}
              className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline aria-[current=page]:font-semibold aria-[current=page]:text-foreground"
            >
              Terms
            </Link>
          </nav>
        </header>
      </div>

      <main id="main-content" className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8 sm:pt-16">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
        </div>

        {children}

        <footer className="mt-16 flex flex-col gap-3 border-t border-border/80 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>Kamolpop Vitayarat</span>
          <div className="flex gap-5">
            <Link className="underline underline-offset-4 hover:text-foreground" to={routes.overview}>
              Calendar overview
            </Link>
            <Link
              className="underline underline-offset-4 hover:text-foreground"
              to={routes.privacy}
            >
              Privacy policy
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
