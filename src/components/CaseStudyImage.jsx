import styles from "./CaseStudyImage.module.css";

export function CaseStudyImage({ src, alt, maxWidth }) {
  return (
    <img
      src={src}
      alt={alt}
      className={styles.image}
      style={maxWidth ? { maxWidth } : undefined}
      loading="lazy"
      decoding="async"
    />
  );
}
