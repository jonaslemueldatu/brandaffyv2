import React from "react";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import "./App.css";

import CreatorLoginPage from "./pages/creators/CreatorLoginPage";
import CreatorRegisterPage from "./pages/creators/CreatorRegisterPage";
import BrandLoginPage from "./pages/brands/BrandLoginPage";
import BrandRegisterPage from "./pages/brands/BrandRegisterPage";
import DashboardProfile from "./pages/dashboard/DashboardProfile";
import Dashboardcreatorhub from "./pages/dashboard/DashboardCreatorHub";
import DashboardCreatorBox from "./pages/dashboard/brands/DashboardCreatorBox";
import DashboardBoxDetails from "./pages/dashboard/brands/DashboardBoxDetails";
import DashboardBrandCampaigns from "./pages/dashboard/brands/DashboardBrandCampaigns";
import DashboardCreatorCampaigns from "./pages/dashboard/creators/DashboardCreatorCampaigns";
import Dashboardcreatecampaign from "./pages/dashboard/brands/DashboardCreateCampaign";
import Dashboardcampaigndetails from "./pages/dashboard/DashboardCampaignDetails";
import DashboardSettings from "./pages/dashboard/DashboardSettings";

import Brandlandingpage from "./pages/brands/BrandLandingPage";
import Creatorlandingpage from "./pages/creators/CreatorLandingPage";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Brandlandingpage />} />
        <Route path="/creator" element={<Creatorlandingpage />} />
        <Route path="/creator/login" element={<CreatorLoginPage />} />
        <Route path="/brand/login" element={<BrandLoginPage />} />
        <Route path="/brand/register" element={<BrandRegisterPage />} />
        <Route path="/creator/register" element={<CreatorRegisterPage />} />
        <Route path="/:type/pages/terms" element={<TermsOfService />} />
        <Route path="/:type/pages/privacy" element={<PrivacyPolicy />} />
        <Route
          path="/dashboard/profile/:id?"
          element={
            <RequireAuth loginPath="/creator/login">
              <DashboardProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/creatorhub"
          element={
            <RequireAuth loginPath="/creator/login">
              <Dashboardcreatorhub />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/creatorbox"
          element={
            <RequireAuth loginPath="/creator/login">
              <DashboardCreatorBox />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/creatorbox/:boxid"
          element={
            <RequireAuth loginPath="/creator/login">
              <DashboardBoxDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/campaigns/creator"
          element={
            <RequireAuth loginPath="/creator/login">
              <DashboardCreatorCampaigns />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/campaigns/brand"
          element={
            <RequireAuth loginPath="/creator/login">
              <DashboardBrandCampaigns />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/campaigns/brand/create"
          element={
            <RequireAuth loginPath="/creator/login">
              <Dashboardcreatecampaign />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/campaigns/creator/:campaignid?"
          element={
            <RequireAuth loginPath="/creator/login">
              <Dashboardcampaigndetails />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/campaigns/brand/:campaignid?"
          element={
            <RequireAuth loginPath="/creator/login">
              <Dashboardcampaigndetails />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <RequireAuth loginPath="/creator/login">
              <DashboardSettings />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
