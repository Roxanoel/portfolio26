import { useParams } from "react-router-dom";
import { findProject } from "../data/projects";

/**
 * Returns the project matching the current /work/:slug route param.
 */
export function useProject() {
  const { slug } = useParams();
  return findProject(slug);
}
