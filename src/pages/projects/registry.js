import { lazy } from "react";

/**
 * Single source of truth mapping each project slug to its case-study page.
 * App.jsx generates the /work/:slug routes from this, and each page derives
 * its own project via useProject() (slug read from the URL).
 */
export const PROJECT_COMPONENTS = {
  "simplified-student-rostering": lazy(() =>
    import("./SimplifiedStudentRostering").then((m) => ({
      default: m.SimplifiedStudentRostering,
    })),
  ),
  "mental-health-resource-assignment": lazy(() =>
    import("./MentalHealthResourceAssignment").then((m) => ({
      default: m.MentalHealthResourceAssignment,
    })),
  ),
  "impact-statistics": lazy(() =>
    import("./ImpactStatistics").then((m) => ({ default: m.ImpactStatistics })),
  ),
  "design-system-overhaul": lazy(() =>
    import("./DesignSystemOverhaul").then((m) => ({
      default: m.OpteoDesignSystemOverhaul,
    })),
  ),
  "shareable-responsive-search-ads": lazy(() =>
    import("./ResponsiveSearchAdsPreview").then((m) => ({
      default: m.ResponsiveSearchAdsPreview,
    })),
  ),
};
