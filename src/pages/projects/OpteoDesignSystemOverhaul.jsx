import { ProjectLayout } from "../../components/ProjectLayout";
import { PROJECTS } from "../../data/projects";

const project = PROJECTS.find((p) => p.slug === "opteo-design-system-overhaul");

export function OpteoDesignSystemOverhaul() {
  return (
    <ProjectLayout project={project}>
      {/* Content coming soon */}
    </ProjectLayout>
  );
}
