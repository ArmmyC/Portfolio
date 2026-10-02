import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("The application root element was not found.");
}

const preRenderedRoute = rootElement.dataset.prerendered;
const canHydrate =
  (preRenderedRoute === "home" && window.location.pathname === "/") ||
  preRenderedRoute === "not-found";

if (canHydrate) {
  hydrateRoot(rootElement, <App />);
} else {
  createRoot(rootElement).render(<App />);
}
