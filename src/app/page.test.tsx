import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

test("renders heading with name", () => {
  render(<Home />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Marcos Lott" })
  ).toBeInTheDocument();
});
