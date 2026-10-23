import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "../App";

describe("Calendar OAuth pages", () => {
  it("renders the Calendar homepage with a privacy policy link", () => {
    render(
      <MemoryRouter initialEntries={["/calendar"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Armmy Hermes Gmail Summary" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Privacy policy" })).not.toHaveLength(0);
    for (const link of screen.getAllByRole("link", { name: "Privacy policy" })) {
      expect(link).toHaveAttribute("href", "/calendar/privacy");
    }
  });

  it("renders the privacy policy with a link back to the app homepage", () => {
    render(
      <MemoryRouter initialEntries={["/calendar/privacy"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1, name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getByText(/Armmy Hermes Gmail Summary/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to calendar overview" })).toHaveAttribute(
      "href",
      "/calendar",
    );
  });
});
