import styles from "./Tag.module.css";

const TONES = {
  Engineering: styles.toneEngineering,
  Product: styles.toneProduct,
  UI: styles.toneUI,
  Research: styles.toneResearch,
  UX: styles.toneUX,
};

export function Tag({ children, variant = "solid" }) {
  const tone = variant === "solid" ? (TONES[children] ?? styles.toneUX) : null;
  const className = [
    styles.tag,
    tone,
    variant === "outline" ? styles.outline : null,
  ]
    .filter(Boolean)
    .join(" ");
  return <span className={className}>{children}</span>;
}

export function TagList({ tags, variant = "solid", className = "" }) {
  return (
    <div className={`${styles.list}${className ? ` ${className}` : ""}`}>
      {tags.map((tag) => (
        <Tag key={tag} variant={variant}>
          {tag}
        </Tag>
      ))}
    </div>
  );
}
