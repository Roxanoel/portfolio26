import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main";
import { SimplifiedStudentRostering } from "./pages/projects/SimplifiedStudentRostering";
import { MentalHealthResourceAssignment } from "./pages/projects/MentalHealthResourceAssignment";

import { B2BSaaSImpactStatistics } from "./pages/projects/B2BSaaSImpactStatistics";
import { ResponsiveSearchAdsPreview } from "./pages/projects/ResponsiveSearchAdsPreview";
import { OpteoDesignSystemOverhaul } from "./pages/projects/DesignSystemOverhaul";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/work/simplified-student-rostering" element={<SimplifiedStudentRostering />} />
        <Route path="/work/mental-health-resource-assignment" element={<MentalHealthResourceAssignment />} />

        <Route path="/work/b2b-saas-impact-statistics" element={<B2BSaaSImpactStatistics />} />
        <Route path="/work/responsive-search-ads-preview" element={<ResponsiveSearchAdsPreview />} />
        <Route path="/work/design-system-overhaul" element={<OpteoDesignSystemOverhaul />} />
      </Routes>
    </BrowserRouter>
  );
}
