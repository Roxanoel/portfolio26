import styles from "./Tag.module.css";

const TONES: Record<string, string> = {
  Engineering: styles.toneEngineering,
  Product: styles.toneProduct,
  UI: styles.toneUI,
  Research: styles.toneResearch,
  UX: styles.toneUX,
};

interface TagProps {
  children: string;
  variant?: "solid" | "outline";
}

export function Tag({ children, variant = "solid" }: TagProps) {
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

interface TagListProps {
  tags: string[];
  variant?: "solid" | "outline";
  className?: string;
}

export function TagList({
  tags,
  variant = "solid",
  className = "",
}: TagListProps) {
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
