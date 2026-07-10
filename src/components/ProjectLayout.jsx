import { Children, useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
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

function JumpSelect({ sections, activeId, onJump }) {
  const [open, setOpen] = useState(false);
  const [focusIdx, setFocusIdx] = useState(-1);
  const [menuStyle, setMenuStyle] = useState({});
  const triggerRef = useRef(null);
  const listRef = useRef(null);

  const activeLabel =
    sections.find((s) => s.id === activeId)?.label ?? "Jump to section…";

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (
        triggerRef.current?.contains(e.target) ||
        listRef.current?.contains(e.target)
      ) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (open && focusIdx >= 0 && listRef.current) {
      listRef.current.children[focusIdx]?.scrollIntoView({ block: "nearest" });
    }
  }, [focusIdx, open]);

  const openMenu = useCallback((startIndex) => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuStyle({
        top: `${rect.bottom + 4}px`,
        right: `${window.innerWidth - rect.right}px`,
        minWidth: `${rect.width}px`,
      });
    }
    setOpen(true);
    setFocusIdx(startIndex);
  }, []);

  const selectFocused = useCallback(() => {
    if (focusIdx >= 0) {
      onJump(sections[focusIdx].id);
      setOpen(false);
    }
  }, [focusIdx, sections, onJump]);

  const handleTriggerKey = useCallback(
    (e) => {
      if (!open) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          openMenu(0);
        }
        return;
      }
      switch (e.key) {
        case "Escape":
          setOpen(false);
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusIdx((i) => (i < sections.length - 1 ? i + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusIdx((i) => (i > 0 ? i - 1 : sections.length - 1));
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          selectFocused();
          break;
      }
    },
    [open, sections.length, openMenu, selectFocused]
  );

  const handleTriggerClick = useCallback(() => {
    if (open) {
      setOpen(false);
    } else {
      const idx = sections.findIndex((s) => s.id === activeId);
      openMenu(idx >= 0 ? idx : 0);
    }
  }, [open, sections, activeId, openMenu]);

  const handleItemClick = useCallback(
    (id) => {
      onJump(id);
      setOpen(false);
    },
    [onJump]
  );

  return (
    <div className={styles.jumpWrapper}>
      <button
        ref={triggerRef}
        className={styles.jumpTrigger}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKey}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {activeLabel}
        <svg
          className={`${styles.jumpChevron}${open ? ` ${styles.jumpChevronOpen}` : ""}`}
          width="8"
          height="6"
          viewBox="0 0 8 6"
          fill="none"
        >
          <path
            d="M1 1.5l3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open &&
        createPortal(
          <ul
            className={styles.jumpMenu}
            ref={listRef}
            role="listbox"
            style={menuStyle}
          >
            {sections.map((s, i) => (
              <li
                key={s.id}
                role="option"
                aria-selected={s.id === activeId}
                className={`${styles.jumpItem}${
                  s.id === activeId ? ` ${styles.jumpItemActive}` : ""
                }${i === focusIdx ? ` ${styles.jumpItemFocus}` : ""}`}
                onClick={() => handleItemClick(s.id)}
                onMouseEnter={() => setFocusIdx(i)}
              >
                {s.label}
              </li>
            ))}
          </ul>,
          document.body
        )}
    </div>
  );
}

export function ProjectLayout({ project, children }) {
  const { n, title, year, blurb, tags, dateRange, nda } = project;
  const sections = sectionsFromChildren(children);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  const handleJump = useCallback((id) => {
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
            <span className={styles.backLabel}>All work</span>
          </Link>
          <span className={styles.navTitle}>{title}</span>
          {sections.length > 0 ? (
            <JumpSelect sections={sections} activeId={activeId} onJump={handleJump} />
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
