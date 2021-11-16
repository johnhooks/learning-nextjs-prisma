/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

// TODO read this https://nextjs.org/docs/testing
// TODO add a tsconfig so the test folder isn't continually rebuilt in VSCode

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /learning next/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
