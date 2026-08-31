import type { ReactNode } from "react";
import styles from "./Legend.module.css";

interface LegendProps {
  caption: string;
  children: ReactNode;
}

export function Legend({ caption, children }: LegendProps) {
  return (
    <figure className={styles.figure}>
      {children}
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}
