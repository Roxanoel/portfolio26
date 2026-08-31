import { PROJECTS } from "../data/projects";
import { ProjectCard } from "./ProjectCard";
import styles from "./WorkGrid.module.css";

interface WorkGridProps {
  motifs: string[];
}

export function WorkGrid({ motifs }: WorkGridProps) {
  return (
    <div className={styles.grid} data-reveal-group>
      {PROJECTS.map((project, i) => (
        <ProjectCard
          key={project.n}
          project={project}
          motifSvg={motifs[i % motifs.length]}
        />
      ))}
    </div>
  );
}
