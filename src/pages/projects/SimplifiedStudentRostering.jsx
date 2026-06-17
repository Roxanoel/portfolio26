import { ProjectLayout } from "../../components/ProjectLayout";
import { PROJECTS } from "../../data/projects";

const project = PROJECTS.find((p) => p.slug === "simplified-student-rostering");

export function SimplifiedStudentRostering() {
  return (
    <ProjectLayout project={project}>
      {/* Content coming soon */}
    </ProjectLayout>
  );
}
