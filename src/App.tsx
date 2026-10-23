import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { ThemeFavicon } from "./components/ThemeFavicon";
import CalendarHome from "./pages/CalendarHome.tsx";
import CalendarPrivacy from "./pages/CalendarPrivacy.tsx";
import CalendarTerms from "./pages/CalendarTerms.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Analytics />
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <ThemeFavicon />
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {children}
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CalendarHome />} />
      <Route path="/privacy" element={<CalendarPrivacy />} />
      <Route path="/terms" element={<CalendarTerms />} />
      {/* Keep the previous directory URLs working while existing OAuth settings are updated. */}
      <Route path="/calendar" element={<CalendarHome />} />
      <Route path="/calendar/privacy" element={<CalendarPrivacy />} />
      <Route path="/calendar/terms" element={<CalendarTerms />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

export default App;
