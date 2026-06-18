import { Link } from "react-router-dom";
import styles from './ProjectCard.module.css'

export function ProjectCard({ project, motifSvg }) {
  const { n, slug, title, year, blurb, tags, image } = project

  return (
    <Link
      to={`/work/${slug}`}
      className={styles.card}
      data-reveal
      aria-label={title}
    >
      <div className={styles.art}>
        {image ? (
          <img src={image} alt="" className={styles.image} />
        ) : (
          /* eslint-disable-next-line react/no-danger */
          <div className={styles.motif} dangerouslySetInnerHTML={{ __html: motifSvg }} />
        )}
        <span className={`${styles.no} mono`}>{n}</span>
        <span className={styles.arrow} aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M3 11L11 3M5 3h6v6" />
          </svg>
        </span>
      </div>
      <div className={styles.body}>
        <div className={styles.titleRow}>
          <span className={styles.title}>{title}</span>
          <span className={styles.year}>{year}</span>
        </div>
        <p className={styles.blurb}>{blurb}</p>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}
