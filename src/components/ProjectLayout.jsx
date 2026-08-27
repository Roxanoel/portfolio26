import {
  Children,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { NdaDisclosure } from "./NdaDisclosure";
import styles from "./ProjectLayout.module.css";

const TAG_CLASS = {
  Engineering: styles.tagEngineering,
  Product: styles.tagProduct,
  UI: styles.tagUI,
  Research: styles.tagResearch,
  UX: styles.tagUX,
};

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
  const optionRefs = useRef([]);

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
    if (open && focusIdx >= 0) {
      optionRefs.current[focusIdx]?.focus();
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

  const handleTriggerKey = useCallback(
    (e) => {
      if (!open) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          openMenu(0);
        }
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    },
    [open, openMenu],
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
    [onJump],
  );

  const handleItemKeyDown = useCallback(
    (e, i) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusIdx((idx) => (idx < sections.length - 1 ? idx + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusIdx((idx) => (idx > 0 ? idx - 1 : sections.length - 1));
          break;
        case "Home":
          e.preventDefault();
          setFocusIdx(0);
          break;
        case "End":
          e.preventDefault();
          setFocusIdx(sections.length - 1);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          onJump(sections[i].id);
          setOpen(false);
          triggerRef.current?.focus();
          break;
        case "Escape":
          e.preventDefault();
          setOpen(false);
          triggerRef.current?.focus();
          break;
      }
    },
    [sections, onJump],
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
                ref={(el) => {
                  optionRefs.current[i] = el;
                }}
                role="option"
                aria-selected={s.id === activeId}
                tabIndex={i === focusIdx ? 0 : -1}
                className={`${styles.jumpItem}${
                  s.id === activeId ? ` ${styles.jumpItemActive}` : ""
                }${i === focusIdx ? ` ${styles.jumpItemFocus}` : ""}`}
                onClick={() => handleItemClick(s.id)}
                onKeyDown={(e) => handleItemKeyDown(e, i)}
              >
                {s.label}
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </div>
  );
}

export function ProjectLayout({ project, children }) {
  const { n, title, blurb, tags, dateRange, nda } = project;
  const sections = useMemo(() => sectionsFromChildren(children), [children]);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const jumpLockRef = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleJump = useCallback((id) => {
    setActiveId(id);
    jumpLockRef.current = true;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    clearTimeout(jumpLockRef.timer);
    jumpLockRef.timer = setTimeout(() => {
      jumpLockRef.current = false;
    }, 700);
  }, []);

  useEffect(() => {
    if (sections.length === 0) return;

    const lastId = sections[sections.length - 1].id;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        if (jumpLockRef.current) {
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
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={`${styles.tag} ${TAG_CLASS[tag] ?? styles.tagUX}`}
                >
                  {tag}
                </span>
              ))}
            </div>
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
