import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { NdaDisclosure } from "./NdaDisclosure";
import { JumpSelect } from "./JumpSelect";
import { TagList } from "./Tag";
import { sectionsFromChildren } from "../utils/sections";
import type { Project } from "../data/projects";
import styles from "./ProjectLayout.module.css";

interface ProjectLayoutProps {
  project: Project;
  children?: ReactNode;
}

interface JumpLock {
  locked: boolean;
  timer: number | undefined;
}

export function ProjectLayout({ project, children }: ProjectLayoutProps) {
  const { n, title, blurb, tags, dateRange, nda } = project;
  const sections = useMemo(() => sectionsFromChildren(children), [children]);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const jumpLockRef = useRef<JumpLock>({ locked: false, timer: undefined });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleJump = useCallback((id: string) => {
    setActiveId(id);
    jumpLockRef.current.locked = true;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    clearTimeout(jumpLockRef.current.timer);
    jumpLockRef.current.timer = window.setTimeout(() => {
      jumpLockRef.current.locked = false;
    }, 700);
  }, []);

  useEffect(() => {
    if (sections.length === 0) return;

    const lastId = sections[sections.length - 1].id;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        if (jumpLockRef.current.locked) {
          ticking = false;
          return;
        }

        const threshold = window.innerHeight / 2;
        let best = sections[0].id;

        for (const s of sections) {
          const el = document.getElementById(s.id);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= threshold) {
            best = s.id;
          }
        }

        const atBottom =
          window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
        if (atBottom) {
          best = lastId;
        }

        setActiveId(best);
        ticking = false;
      });
      ticking = true;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <div className={styles.page}>
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
            <span className={styles.backLabel}>All work</span>
          </Link>
          <span className={styles.navTitle}>{title}</span>
          {sections.length > 0 ? (
            <JumpSelect
              sections={sections}
              activeId={activeId}
              onJump={handleJump}
            />
          ) : (
            <span className={styles.navNo}>{n}</span>
          )}
        </div>
      </nav>

      <header className={styles.header}>
        <div className="wrap">
          <div className={styles.meta}>
            <TagList tags={tags} />
          </div>
          <h1 className={styles.title}>{title}</h1>
          {dateRange && <p className={styles.dateRange}>{dateRange}</p>}
          <p className={`${styles.blurb}${nda ? ` ${styles.blurbNda}` : ""}`}>
            {blurb}
          </p>
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
