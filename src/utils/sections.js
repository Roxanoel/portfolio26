import { Children } from "react";

/**
 * Derives the { id, label } sections from a ProjectLayout's Slide children.
 * Only children whose `id` starts with "slide-" are included; the label is
 * the id with the "slide-" prefix stripped and words capitalized.
 */
export function sectionsFromChildren(children) {
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
