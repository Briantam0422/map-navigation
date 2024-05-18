import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("testing", () => {
    render(<Home />);
    const input = screen.getByRole("button");
    expect(input).toBeInTheDocument();
  });
});
