import { ProjectLayout } from "../../components/ProjectLayout";
import { useProject } from "../../hooks/useProject";

export function ResponsiveSearchAdsPreview() {
  const project = useProject();

  return (
    <ProjectLayout project={project}>{/* Content coming soon */}</ProjectLayout>
  );
}
