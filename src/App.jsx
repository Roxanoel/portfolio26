import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Main } from "./pages/Main";

const SimplifiedStudentRostering = lazy(() =>
  import("./pages/projects/SimplifiedStudentRostering").then((m) => ({
    default: m.SimplifiedStudentRostering,
  })),
);
const MentalHealthResourceAssignment = lazy(() =>
  import("./pages/projects/MentalHealthResourceAssignment").then((m) => ({
    default: m.MentalHealthResourceAssignment,
  })),
);
const ImpactStatistics = lazy(() =>
  import("./pages/projects/ImpactStatistics").then((m) => ({
    default: m.ImpactStatistics,
  })),
);
const ResponsiveSearchAdsPreview = lazy(() =>
  import("./pages/projects/ResponsiveSearchAdsPreview").then((m) => ({
    default: m.ResponsiveSearchAdsPreview,
  })),
);
const OpteoDesignSystemOverhaul = lazy(() =>
  import("./pages/projects/DesignSystemOverhaul").then((m) => ({
    default: m.OpteoDesignSystemOverhaul,
  })),
);

function PageLoader() {
  return <div className="pageLoader" aria-live="polite" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/work/simplified-student-rostering"
            element={<SimplifiedStudentRostering />}
          />
          <Route
            path="/work/mental-health-resource-assignment"
            element={<MentalHealthResourceAssignment />}
          />

          <Route
            path="/work/impact-statistics"
            element={<ImpactStatistics />}
          />
          <Route
            path="/work/b2b-saas-impact-statistics"
            element={<Navigate to="/work/impact-statistics" replace />}
          />
          <Route
            path="/work/responsive-search-ads-preview"
            element={<ResponsiveSearchAdsPreview />}
          />
          <Route
            path="/work/design-system-overhaul"
            element={<OpteoDesignSystemOverhaul />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
