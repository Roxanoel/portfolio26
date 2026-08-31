import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import type { Section } from "../utils/sections";
import styles from "./JumpSelect.module.css";

interface JumpSelectProps {
  sections: Section[];
  activeId: string;
  onJump: (id: string) => void;
}

export function JumpSelect({ sections, activeId, onJump }: JumpSelectProps) {
  const [open, setOpen] = useState(false);
  const [focusIdx, setFocusIdx] = useState(-1);
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const activeLabel =
    sections.find((s) => s.id === activeId)?.label ?? "Jump to section…";

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        listRef.current?.contains(e.target as Node)
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

  const openMenu = useCallback((startIndex: number) => {
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
    (e: KeyboardEvent<HTMLButtonElement>) => {
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
    (id: string) => {
      onJump(id);
      setOpen(false);
    },
    [onJump],
  );

  const handleItemKeyDown = useCallback(
    (e: KeyboardEvent<HTMLLIElement>, i: number) => {
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
