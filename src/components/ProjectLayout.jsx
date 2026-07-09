import { Link } from "react-router-dom";
import { Grain } from "./Grain";
import { TAG_COLORS } from "../data/projects";
import styles from "./ProjectLayout.module.css";

export function ProjectLayout({ project, children }) {
  const { n, title, year, blurb, tags, dateRange } = project;

  return (
    <div className={styles.page}>
      <Grain />

      <nav className={styles.nav}>
        <div className="wrap">
          <Link to="/#work" className={styles.back}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M11 7H3M6 3L2 7l4 4" />
            </svg>
            All work
          </Link>
          <span className={styles.navNo}>{n}</span>
        </div>
      </nav>

      <header className={styles.header}>
        <div className="wrap">
          <div className={styles.meta}>
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={styles.tag}
                  style={{
                    background: TAG_COLORS[tag]?.bg,
                    color: TAG_COLORS[tag]?.ink,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <h1 className={styles.title}>{title}</h1>
          {dateRange && <p className={styles.dateRange}>{dateRange}</p>}
          <p className={styles.blurb}>{blurb}</p>
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className="wrap">
          <Link to="/#work" className={styles.footBack}>
            ← Back to all work
          </Link>
        </div>
      </footer>
    </div>
  );
}
