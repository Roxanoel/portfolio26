import { describe, it, expect } from "vitest";
import { createElement } from "react";
import { sectionsFromChildren } from "./sections";

describe("sectionsFromChildren", () => {
  it("derives id and humanized label from slide children", () => {
    const children = [
      createElement("section", { id: "slide-problem" }),
      createElement("section", { id: "slide-defining-the-solution" }),
    ];
    expect(sectionsFromChildren(children)).toEqual([
      { id: "slide-problem", label: "Problem" },
      { id: "slide-defining-the-solution", label: "Defining The Solution" },
    ]);
  });

  it("ignores children without a slide- prefixed id", () => {
    const children = [
      createElement("section", { id: "slide-a" }),
      createElement("div"),
      createElement("section", { id: "not-a-slide" }),
    ];
    expect(sectionsFromChildren(children)).toEqual([
      { id: "slide-a", label: "A" },
    ]);
  });

  it("returns an empty array when there are no slides", () => {
    expect(sectionsFromChildren(createElement("div"))).toEqual([]);
  });
});
