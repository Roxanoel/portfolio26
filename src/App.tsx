import { Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import { Main } from "./pages/Main";
import { PROJECT_COMPONENTS } from "./pages/projects/registry";
import { findProject } from "./data/projects";

function ProjectRoute() {
  const { slug } = useParams();
  const resolved = slug ?? "";
  const Component = PROJECT_COMPONENTS[resolved];
  if (!Component || !findProject(resolved)) {
    return <Navigate to="/" replace />;
  }
  return <Component />;
}

function PageLoader() {
  return <div className="pageLoader" aria-live="polite" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/work/:slug" element={<ProjectRoute />} />
          <Route
            path="/work/b2b-saas-impact-statistics"
            element={<Navigate to="/work/impact-statistics" replace />}
          />
          <Route
            path="/work/responsive-search-ads-preview"
            element={
              <Navigate to="/work/shareable-responsive-search-ads" replace />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
