import styles from "./NdaDisclosure.module.css";

export function NdaDisclosure() {
  return (
    <aside className={styles.box}>
      <strong className={styles.label}>Under NDA</strong>
      <p className={styles.copy}>
        To respect NDA guidelines, specific details and visuals have been
        omitted. What follows is a high-level, compliant rebuilding of my
        process.
      </p>
    </aside>
  );
}
