import { ProjectLayout } from "../../components/ProjectLayout";
import { useProject } from "../../hooks/useProject";

export function ResponsiveSearchAdsPreview() {
  const project = useProject();
  if (!project) return null;

  return (
    <ProjectLayout project={project}>{/* Content coming soon */}</ProjectLayout>
  );
}
