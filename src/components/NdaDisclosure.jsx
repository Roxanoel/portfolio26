import styles from "./NdaDisclosure.module.css";

export function NdaDisclosure() {
  return (
    <aside className={styles.box}>
      <strong className={styles.label}>Under NDA</strong>
      <p className={styles.copy}>
        Some of the details and visuals for this project are under NDA and
        cannot be shared publicly. What follows is a higher-level exposé of my
        process.
      </p>
    </aside>
  );
}
