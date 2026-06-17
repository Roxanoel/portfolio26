import { ProjectLayout } from "../../components/ProjectLayout";
import { PROJECTS } from "../../data/projects";

const project = PROJECTS.find((p) => p.slug === "b2b-saas-impact-statistics");

export function B2BSaaSImpactStatistics() {
  return (
    <ProjectLayout project={project}>
      {/* Content coming soon */}
    </ProjectLayout>
  );
}
