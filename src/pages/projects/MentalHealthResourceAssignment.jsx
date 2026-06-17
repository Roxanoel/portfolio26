import { ProjectLayout } from "../../components/ProjectLayout";
import { PROJECTS } from "../../data/projects";

const project = PROJECTS.find((p) => p.slug === "mental-health-resource-assignment");

export function MentalHealthResourceAssignment() {
  return (
    <ProjectLayout project={project}>
      {/* Content coming soon */}
    </ProjectLayout>
  );
}
