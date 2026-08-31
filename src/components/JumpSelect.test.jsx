import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { JumpSelect } from "./JumpSelect";

const sections = [
  { id: "slide-problem", label: "Problem" },
  { id: "slide-defining", label: "Defining" },
  { id: "slide-impact", label: "Impact" },
];

describe("JumpSelect", () => {
  it("shows the active section label", () => {
    render(
      <JumpSelect
        sections={sections}
        activeId="slide-problem"
        onJump={vi.fn()}
      />,
    );
    expect(screen.getByRole("button")).toHaveTextContent("Problem");
  });

  it("opens the listbox and selects via Enter", () => {
    const onJump = vi.fn();
    render(
      <JumpSelect
        sections={sections}
        activeId="slide-problem"
        onJump={onJump}
      />,
    );
    fireEvent.click(screen.getByRole("button"));

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);

    fireEvent.keyDown(options[1], { key: "Enter" });
    expect(onJump).toHaveBeenCalledWith("slide-defining");
  });

  it("selects on click", () => {
    const onJump = vi.fn();
    render(
      <JumpSelect
        sections={sections}
        activeId="slide-problem"
        onJump={onJump}
      />,
    );
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getAllByRole("option")[2]);
    expect(onJump).toHaveBeenCalledWith("slide-impact");
  });

  it("moves focus with ArrowDown", () => {
    render(
      <JumpSelect
        sections={sections}
        activeId="slide-problem"
        onJump={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole("button"));

    const options = screen.getAllByRole("option");
    fireEvent.keyDown(options[0], { key: "ArrowDown" });
    expect(document.activeElement).toBe(options[1]);
  });
});
