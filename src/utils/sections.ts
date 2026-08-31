import { Children, isValidElement, type ReactNode } from "react";

export interface Section {
  id: string;
  label: string;
}

/**
 * Derives the { id, label } sections from a ProjectLayout's Slide children.
 * Only children whose `id` starts with "slide-" are included; the label is
 * the id with the "slide-" prefix stripped and words capitalized.
 */
export function sectionsFromChildren(children: ReactNode): Section[] {
  const sections: Section[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    const id = (child.props as { id?: unknown }).id;
    if (typeof id !== "string" || !id.startsWith("slide-")) return;
    sections.push({
      id,
      label: id
        .replace("slide-", "")
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
    });
  });
  return sections;
}
