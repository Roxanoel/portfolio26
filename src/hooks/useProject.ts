import { useParams } from "react-router-dom";
import { findProject, type Project } from "../data/projects";

/**
 * Returns the project matching the current /work/:slug route param.
 */
export function useProject(): Project | undefined {
  const { slug } = useParams();
  return findProject(slug ?? "");
}
