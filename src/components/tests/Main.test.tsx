import React from "react";
import { render, screen } from "@testing-library/react";
import Main from "../Main";

describe("Main component", () => {
  test("renders recipe cards", () => {
    render(<Main />);

    const recipeCards = screen.getAllByTestId("recipe-card");
    expect(recipeCards.length).toBeGreaterThan(0);
  });

  // Add more tests as needed
});
