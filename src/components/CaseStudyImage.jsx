import styles from "./CaseStudyImage.module.css";

export function CaseStudyImage({ src, alt, maxWidth }) {
  const style =
    maxWidth === true
      ? undefined
      : maxWidth
        ? { maxWidth: maxWidth }
        : undefined;

  return (
    <img
      src={src}
      alt={alt}
      className={`${styles.image} ${maxWidth === true ? styles.maxWidth : ""}`}
      style={style}
    />
  );
}
