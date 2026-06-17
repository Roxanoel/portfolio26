import { ProjectLayout } from "../../components/ProjectLayout";
import { PROJECTS } from "../../data/projects";

const project = PROJECTS.find((p) => p.slug === "responsive-search-ads-preview");

export function ResponsiveSearchAdsPreview() {
  return (
    <ProjectLayout project={project}>
      {/* Content coming soon */}
    </ProjectLayout>
  );
}
