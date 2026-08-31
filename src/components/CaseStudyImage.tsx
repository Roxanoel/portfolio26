import styles from "./CaseStudyImage.module.css";

interface CaseStudyImageProps {
  src: string;
  alt: string;
  maxWidth?: number;
}

export function CaseStudyImage({ src, alt, maxWidth }: CaseStudyImageProps) {
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
