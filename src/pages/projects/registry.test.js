import { describe, it, expect } from "vitest";
import { PROJECTS, findProject } from "../../data/projects";
import { PROJECT_COMPONENTS } from "./registry";

describe("project registry", () => {
  it("has a page for every published project", () => {
    for (const p of PROJECTS) {
      expect(
        PROJECT_COMPONENTS[p.slug],
        `missing page for "${p.slug}"`,
      ).toBeDefined();
    }
  });

  it("every registry slug resolves to a project", () => {
    for (const slug of Object.keys(PROJECT_COMPONENTS)) {
      expect(findProject(slug), `no project data for "${slug}"`).toBeDefined();
    }
  });
});
