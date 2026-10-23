import { useLocation } from "react-router-dom";

export function useCalendarRoutes() {
  const { pathname } = useLocation();
  const prefix = pathname === "/calendar" || pathname.startsWith("/calendar/")
    ? "/calendar"
    : "";

  return {
    overview: prefix || "/",
    privacy: `${prefix}/privacy`,
    terms: `${prefix}/terms`,
  };
}
