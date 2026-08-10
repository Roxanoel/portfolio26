import styles from "./Legend.module.css";

export function Legend({ caption, children }) {
  return (
    <figure className={styles.figure}>
      {children}
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}
