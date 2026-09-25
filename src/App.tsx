import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { GovernmentLayout } from './layouts/GovernmentLayout';
import { ResearchLayout, InstitutionLayout, PublicLayout, AdminLayout, DataLayout } from './layouts/PortalLayouts';
import { ProtectedRoute } from './components/common/ProtectedRoute';

import { Home } from './pages/Home';
import { Login } from './pages/Login';

// Role 4: Government / Policy & Planning Pages
import { DistrictDashboard } from './pages/government/DistrictDashboard';
import { StateDashboard, NationalDashboard } from './pages/government/HigherAuthorityDashboards';
import { CandidateSiteSearchPage } from './pages/government/CandidateSiteSearchPage';
import { PolicySimulatorPage } from './pages/government/PolicySimulatorPage';
import { ScenarioComparisonPage } from './pages/government/ScenarioComparisonPage';
import { ResearchEvidencePage } from './pages/government/ResearchEvidencePage';
import { ImplementationMonitoringPage } from './pages/government/ImplementationMonitoringPage';
import { AuditTrailPage } from './pages/government/AuditTrailPage';

// Role 2: Data & GIS Officer Pages
import { DataDashboard } from './pages/data/DataDashboard';
import { DataCatalogPage } from './pages/data/DataCatalogPage';
import { DataDatasetDetailPage } from './pages/data/DataDatasetDetailPage';
import { DataUploadPage } from './pages/data/DataUploadPage';
import { DataValidationPage } from './pages/data/DataValidationPage';
import { DataSourcesPage } from './pages/data/DataSourcesPage';
import { DataSourceDetailPage } from './pages/data/DataSourceDetailPage';
import { DataVersionsPage } from './pages/data/DataVersionsPage';
import { DataVersionComparePage } from './pages/data/DataVersionComparePage';
import { DataGISLayersPage } from './pages/data/DataGISLayersPage';
import { DataGISLayerDetailPage } from './pages/data/DataGISLayerDetailPage';
import { DataGISMapWorkspace } from './pages/data/DataGISMapWorkspace';
import { DataSpatialAnalysisPage } from './pages/data/DataSpatialAnalysisPage';
import { DataQualityPage } from './pages/data/DataQualityPage';
import { DataConflictsPage } from './pages/data/DataConflictsPage';
import { DataConflictDetailPage } from './pages/data/DataConflictDetailPage';
import { DataFreshnessPage } from './pages/data/DataFreshnessPage';
import { DataIntegrationsPage } from './pages/data/DataIntegrationsPage';
import { DataActivityLogPage } from './pages/data/DataActivityLogPage';

// Role 3: Research Pages
import { ResearchOverview, ResearchSearch } from './pages/research/ResearchOverviewAndSearch';
import { PaperDetails } from './pages/research/PaperDetails';

// Role 5: Institution Pages
import { InstitutionOverview } from './pages/institution/InstitutionOverview';

// Public Open Information Pages (100% Accessible, Read-Only)
import { PublicHome } from './pages/public/PublicHome';
import { PublicGISMapPage } from './pages/public/PublicGISMapPage';
import { PublicResearchPage } from './pages/public/PublicResearchPage';
import { PublicResearchDetailPage } from './pages/public/PublicResearchDetailPage';
import { PublicReportsPage } from './pages/public/PublicReportsPage';
import { PublicReportDetailPage } from './pages/public/PublicReportDetailPage';
import { PublicStatisticsPage } from './pages/public/PublicStatisticsPage';
import { PublicOpenDataPage } from './pages/public/PublicOpenDataPage';
import { PublicOpenDataDetailPage } from './pages/public/PublicOpenDataDetailPage';
import { PublicProjectsPage } from './pages/public/PublicProjectsPage';
import { PublicProjectDetailPage } from './pages/public/PublicProjectDetailPage';
import { PublicLandUsePage } from './pages/public/PublicLandUsePage';
import { PublicClimatePage } from './pages/public/PublicClimatePage';
import { PublicAboutPage } from './pages/public/PublicAboutPage';
import { PublicHelpPage } from './pages/public/PublicHelpPage';

// Role 1: System Administrator Pages
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminUserDetailPage } from './pages/admin/AdminUserDetailPage';
import { AdminInstitutionsPage } from './pages/admin/AdminInstitutionsPage';
import { AdminInstitutionDetailPage } from './pages/admin/AdminInstitutionDetailPage';
import { AdminApprovalsPage } from './pages/admin/AdminApprovalsPage';
import { AdminApprovalDetailPage } from './pages/admin/AdminApprovalDetailPage';
import { AdminDatasetsPage } from './pages/admin/AdminDatasetsPage';
import { AdminDatasetDetailPage } from './pages/admin/AdminDatasetDetailPage';
import { AdminGISLayersPage } from './pages/admin/AdminGISLayersPage';
import { AdminGISLayerDetailPage } from './pages/admin/AdminGISLayerDetailPage';
import { AdminDataConflictsPage } from './pages/admin/AdminDataConflictsPage';
import { AdminDataConflictDetailPage } from './pages/admin/AdminDataConflictDetailPage';
import { AdminIntegrationsPage } from './pages/admin/AdminIntegrationsPage';
import { AdminSystemHealthPage } from './pages/admin/AdminSystemHealthPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';
import { AdminAuditDetailPage } from './pages/admin/AdminAuditDetailPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Workspace & Innovation Pages
import { WorkspacePage } from './pages/workspace/WorkspacePage';
import { InnovationPage } from './pages/innovation/InnovationPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Public Website Layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="workspace" element={<WorkspacePage />} />
          <Route path="innovation" element={<InnovationPage />} />
        </Route>

        {/* Public Open Information Portal (No Login Required - 100% Accessible Read-Only) */}
        <Route path="/public" element={<PublicLayout />}>
          <Route index element={<PublicHome />} />
          <Route path="map" element={<PublicGISMapPage />} />
          <Route path="research" element={<PublicResearchPage />} />
          <Route path="research/:id" element={<PublicResearchDetailPage />} />
          <Route path="reports" element={<PublicReportsPage />} />
          <Route path="reports/:id" element={<PublicReportDetailPage />} />
          <Route path="statistics" element={<PublicStatisticsPage />} />
          <Route path="open-data" element={<PublicOpenDataPage />} />
          <Route path="open-data/:id" element={<PublicOpenDataDetailPage />} />
          <Route path="projects" element={<PublicProjectsPage />} />
          <Route path="projects/:id" element={<PublicProjectDetailPage />} />
          <Route path="land-use" element={<PublicLandUsePage />} />
          <Route path="climate" element={<PublicClimatePage />} />
          <Route path="about" element={<PublicAboutPage />} />
          <Route path="help" element={<PublicHelpPage />} />
        </Route>

        {/* STRICT ROLE-PROTECTED PORTALS FOR THE 5 STAKEHOLDER ROLES */}

        {/* 1. ROLE 1: SYSTEM ADMINISTRATOR PORTAL */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminOverview />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="users/:id" element={<AdminUserDetailPage />} />
            <Route path="institutions" element={<AdminInstitutionsPage />} />
            <Route path="institutions/:id" element={<AdminInstitutionDetailPage />} />
            <Route path="approvals" element={<AdminApprovalsPage />} />
            <Route path="approvals/:id" element={<AdminApprovalDetailPage />} />
            <Route path="datasets" element={<AdminDatasetsPage />} />
            <Route path="datasets/:id" element={<AdminDatasetDetailPage />} />
            <Route path="gis-layers" element={<AdminGISLayersPage />} />
            <Route path="gis-layers/:id" element={<AdminGISLayerDetailPage />} />
            <Route path="data-conflicts" element={<AdminDataConflictsPage />} />
            <Route path="data-conflicts/:id" element={<AdminDataConflictDetailPage />} />
            <Route path="integrations" element={<AdminIntegrationsPage />} />
            <Route path="system-health" element={<AdminSystemHealthPage />} />
            <Route path="audit" element={<AdminAuditLogsPage />} />
            <Route path="audit/:id" element={<AdminAuditDetailPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="roles" element={<AdminSettingsPage />} />
          </Route>
        </Route>

        {/* 2. ROLE 2: DATA & GIS OFFICER PORTAL */}
        <Route element={<ProtectedRoute allowedRoles={['DATA_GIS_OFFICER', 'ADMIN']} />}>
          <Route path="/data" element={<DataLayout />}>
            <Route index element={<Navigate to="/data/dashboard" replace />} />
            <Route path="dashboard" element={<DataDashboard />} />
            <Route path="datasets" element={<DataCatalogPage />} />
            <Route path="datasets/:id" element={<DataDatasetDetailPage />} />
            <Route path="upload" element={<DataUploadPage />} />
            <Route path="validation" element={<DataValidationPage />} />
            <Route path="sources" element={<DataSourcesPage />} />
            <Route path="sources/:id" element={<DataSourceDetailPage />} />
            <Route path="versions" element={<DataVersionsPage />} />
            <Route path="versions/compare" element={<DataVersionComparePage />} />
            <Route path="gis-layers" element={<DataGISLayersPage />} />
            <Route path="gis-layers/:id" element={<DataGISLayerDetailPage />} />
            <Route path="gis-map" element={<DataGISMapWorkspace />} />
            <Route path="spatial-analysis" element={<DataSpatialAnalysisPage />} />
            <Route path="quality" element={<DataQualityPage />} />
            <Route path="conflicts" element={<DataConflictsPage />} />
            <Route path="conflicts/:id" element={<DataConflictDetailPage />} />
            <Route path="freshness" element={<DataFreshnessPage />} />
            <Route path="integrations" element={<DataIntegrationsPage />} />
            <Route path="activity" element={<DataActivityLogPage />} />
          </Route>
        </Route>

        {/* 3. ROLE 3: RESEARCHER PORTAL */}
        <Route element={<ProtectedRoute allowedRoles={['RESEARCHER', 'ADMIN']} />}>
          <Route path="/research" element={<ResearchLayout />}>
            <Route index element={<Navigate to="/research/dashboard" replace />} />
            <Route path="dashboard" element={<ResearchOverview />} />
            <Route path="search" element={<ResearchSearch />} />
            <Route path="map" element={<ResearchOverview />} />
            <Route path="papers" element={<ResearchSearch />} />
            <Route path="papers/:id" element={<PaperDetails />} />
            <Route path="projects" element={<ResearchOverview />} />
            <Route path="datasets" element={<ResearchOverview />} />
            <Route path="workspace" element={<WorkspacePage />} />
          </Route>
        </Route>

        {/* 4. ROLE 4: POLICY & PLANNING OFFICER PORTAL */}
        <Route element={<ProtectedRoute allowedRoles={['POLICY_PLANNING_OFFICER', 'ADMIN']} />}>
          <Route path="/government" element={<GovernmentLayout />}>
            <Route index element={<Navigate to="/government/dashboard" replace />} />
            <Route path="dashboard" element={<DistrictDashboard />} />
            <Route path="district" element={<DistrictDashboard />} />
            <Route path="state" element={<StateDashboard />} />
            <Route path="national" element={<NationalDashboard />} />
            <Route path="site-search" element={<CandidateSiteSearchPage />} />
            <Route path="site/:id" element={<CandidateSiteSearchPage />} />
            <Route path="risk" element={<DistrictDashboard />} />
            <Route path="policy" element={<Navigate to="/government/policy/simulator" replace />} />
            <Route path="policy/simulator" element={<PolicySimulatorPage />} />
            <Route path="policy/scenario-comparison" element={<ScenarioComparisonPage />} />
            <Route path="research-evidence" element={<ResearchEvidencePage />} />
            <Route path="reports" element={<DistrictDashboard />} />
            <Route path="monitoring" element={<ImplementationMonitoringPage />} />
            <Route path="audit" element={<AuditTrailPage />} />
          </Route>
        </Route>

        {/* 5. ROLE 5: INSTITUTIONAL USER PORTAL */}
        <Route element={<ProtectedRoute allowedRoles={['INSTITUTION_USER', 'ADMIN']} />}>
          <Route path="/institution" element={<InstitutionLayout />}>
            <Route index element={<Navigate to="/institution/dashboard" replace />} />
            <Route path="dashboard" element={<InstitutionOverview />} />
            <Route path="profile" element={<InstitutionOverview />} />
            <Route path="researchers" element={<InstitutionOverview />} />
            <Route path="projects" element={<InstitutionOverview />} />
            <Route path="datasets" element={<InstitutionOverview />} />
            <Route path="publications" element={<InstitutionOverview />} />
          </Route>
        </Route>

        {/* Fallback Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
