import { describe, it, expect } from "vitest";
import { PROJECTS, findProject } from "./projects";

describe("PROJECTS", () => {
  it("contains only published projects", () => {
    expect(PROJECTS.length).toBeGreaterThan(0);
    expect(PROJECTS.every((p) => p.status === "published")).toBe(true);
  });

  it("is sorted newest first", () => {
    const years = PROJECTS.map((p) => Number(p.year));
    for (let i = 1; i < years.length; i++) {
      expect(years[i - 1]).toBeGreaterThanOrEqual(years[i]);
    }
  });

  it("assigns zero-padded sequential numbers", () => {
    PROJECTS.forEach((p, i) => {
      expect(p.n).toBe(String(i + 1).padStart(2, "0"));
    });
  });
});

describe("findProject", () => {
  it("resolves every published project slug", () => {
    for (const p of PROJECTS) {
      expect(findProject(p.slug)).toBeDefined();
    }
  });

  it("resolves the slugs used by the case-study pages", () => {
    const pageSlugs = [
      "simplified-student-rostering",
      "mental-health-resource-assignment",
      "design-system-overhaul",
      "impact-statistics",
      "shareable-responsive-search-ads",
    ];
    for (const slug of pageSlugs) {
      expect(findProject(slug), `slug "${slug}"`).toBeDefined();
    }
  });

  it("returns undefined for an unknown slug", () => {
    expect(findProject("does-not-exist")).toBeUndefined();
  });
});
