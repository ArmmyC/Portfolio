import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppProviders, AppRoutes } from "./App";

export function renderRoute(location: string) {
  return renderToString(
    <AppProviders>
      <StaticRouter location={location}>
        <AppRoutes />
      </StaticRouter>
    </AppProviders>,
  );
}
