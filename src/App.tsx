import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { ThemeFavicon } from "./components/ThemeFavicon";
import Index from "./pages/Index.tsx";
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
      <Route path="/" element={<Index />} />
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
