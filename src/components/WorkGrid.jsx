import { PROJECTS } from "../data/projects";
import { ProjectCard } from "./ProjectCard";
import styles from "./WorkGrid.module.css";

export function WorkGrid({ motifs }) {
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
