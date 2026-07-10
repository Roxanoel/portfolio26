import { Children, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Grain } from "./Grain";
import { NdaDisclosure } from "./NdaDisclosure";
import { TAG_COLORS } from "../data/projects";
import styles from "./ProjectLayout.module.css";

function sectionsFromChildren(children) {
  return Children.toArray(children)
    .filter((child) => child.props?.id?.startsWith("slide-"))
    .map((child) => {
      const id = child.props.id;
      const label = id
        .replace("slide-", "")
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      return { id, label };
    });
}

export function ProjectLayout({ project, children }) {
  const { n, title, year, blurb, tags, dateRange, nda } = project;
  const sections = sectionsFromChildren(children);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  const handleJump = useCallback((e) => {
    const id = e.target.value;
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

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
          {sections.length > 0 ? (
            <select className={styles.jump} onChange={handleJump} value={activeId}>
              <option value="" disabled>
                Jump to section…
              </option>
              {sections.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          ) : (
            <span className={styles.navNo}>{n}</span>
          )}
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
          <p className={`${styles.blurb}${nda ? ` ${styles.blurbNda}` : ""}`}>{blurb}</p>
          {nda && <NdaDisclosure />}
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
