import styles from "./Slide.module.css";

export function Slide({ id, className, children }) {
  return (
    <section id={id} className={`${styles.slide} ${className ?? ""}`}>
      <div className="wrap">
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}
