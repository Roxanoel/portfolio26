import type { ReactNode } from "react";
import styles from "./Slide.module.css";

interface SlideProps {
  id: string;
  className?: string;
  children: ReactNode;
}

export function Slide({ id, className, children }: SlideProps) {
  return (
    <section id={id} className={`${styles.slide} ${className ?? ""}`}>
      <div className="wrap">
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}
