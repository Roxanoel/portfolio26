import { ProjectLayout } from "../../components/ProjectLayout";
import { findProject } from "../../data/projects";

const project = findProject("shareable-responsive-search-ads");

export function ResponsiveSearchAdsPreview() {
  return (
    <ProjectLayout project={project}>{/* Content coming soon */}</ProjectLayout>
  );
}
