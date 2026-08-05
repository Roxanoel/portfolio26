import simplifiedStudentRostering from "../assets/project-simplified-student-rostering.png";
import mentalHealthResourceAssignment from "../assets/project-mental-health-resource-assignment.png";
import b2bSaaSImpactStatistics from "../assets/project-b2b-saas-impact-statistics.png";
import DesignSystemOverhaul from "../assets/project-design-system-overhaul.png";
import shareableResponsiveSearchAds from "../assets/project-shareable-responsive-search-ads.png";

export const TAG_COLORS = {
  Engineering: { bg: "#3f5e54", ink: "#f2e8d5" },
  Product: { bg: "#c75f3a", ink: "#f7efe0" },
  UI: { bg: "#d9a441", ink: "#241c10" },
  Research: { bg: "#1c1a17", ink: "#f2e8d5" },
};

const RAW_PROJECTS = [
  {
    slug: "simplified-student-rostering",
    title: "Simplified Student Rostering",
    year: "2026",
    dateRange: "January – February 2026",
    status: "published",
    nda: true,
    blurb:
      "Tackling attrition by identifying and addressing the main friction point in an edtech tool's onboarding process, namely student rostering.",
    tags: ["UX", "UI", "Research", "Engineering"],
    image: simplifiedStudentRostering,
  },
  {
    slug: "mental-health-resource-assignment",
    title: "Mental Health Resource Assignment",
    year: "2025",
    status: "published",
    nda: true,
    blurb:
      "Building the missing link to provide an end-to-end student mental health solution.",
    tags: ["Product", "UX", "Engineering"],
    image: mentalHealthResourceAssignment,
  },

  {
    slug: "design-system-overhaul",
    title: "Design System Overhaul",
    year: "2024",
    status: "published",
    nda: false,
    blurb:
      "A sample of a few technically challenging components built as part of rebuilding a design system from the ground up.",
    tags: ["Engineering", "UI"],
    image: DesignSystemOverhaul,
  },
  {
    slug: "b2b-saas-impact-statistics",
    title: "B2B SaaS Impact Statistics",
    year: "2024",
    status: "draft",
    nda: false,
    blurb:
      "A suite of data visualisation tools to help team leaders monitor team contributions and optimize tool usage for increased ROI.",
    tags: ["UX", "Engineering", "UI"],
    image: b2bSaaSImpactStatistics,
  },
  {
    slug: "shareable-responsive-search-ads",
    title: "Shareable Responsive Search Ads",
    year: "2023",
    status: "draft",
    nda: false,
    blurb:
      "A handy tool to drive conversions by allowing teams to externally share RSAs made within our tool.",
    tags: ["Engineering", "UX", "UI"],
    image: shareableResponsiveSearchAds,
  },
];

const published = RAW_PROJECTS.filter((p) => p.status === "published");
const sorted = [...published].sort((a, b) => b.year - a.year);

export const PROJECTS = sorted.map((p, i) => ({
  ...p,
  n: String(i + 1).padStart(2, "0"),
}));
