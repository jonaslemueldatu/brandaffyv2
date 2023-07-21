import React from "react";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import "./App.css";

import AffiliateLoginPage from "./pages/influencers/AffiliateLoginPage";
import AffiliateRegisterPage from "./pages/influencers/AffiliateRegisterPage";
import BrandLoginPage from "./pages/brands/BrandLoginPage";
import BrandRegisterPage from "./pages/brands/BrandRegisterPage";
import DashboardProfile from "./pages/dashboard/DashboardProfile";
import Dashboardinfluencerhub from "./pages/dashboard/DashboardInfluencerHub";
import DashboardInfluencerBox from "./pages/dashboard/brands/DashboardInfluencerBox";
import DashboardBoxDetails from "./pages/dashboard/brands/DashboardBoxDetails";
import DashboardBrandCampaigns from "./pages/dashboard/brands/DashboardBrandCampaigns";
import DashboardInfluencerCampaigns from "./pages/dashboard/influencers/DashboardInfluencerCampaigns";
import Dashboardcreatecampaign from "./pages/dashboard/brands/DashboardCreateCampaign";
import Brandlandingpage from "./pages/brands/BrandLandingPage";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Brandlandingpage />} />
        <Route path="/affiliate/login" element={<AffiliateLoginPage />} />
        <Route path="/brand/login" element={<BrandLoginPage />} />
        <Route path="/brand/register" element={<BrandRegisterPage />} />
        <Route path="/affiliate/register" element={<AffiliateRegisterPage />} />
        <Route path="/:type/pages/terms" element={<TermsOfService />} />
        <Route path="/:type/pages/privacy" element={<PrivacyPolicy />} />
        <Route
          path="/dashboard/profile/:id?"
          element={
            <RequireAuth loginPath="/affiliate/login">
              <DashboardProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/influencerhub"
          element={
            <RequireAuth loginPath="/affiliate/login">
              <Dashboardinfluencerhub />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/influencerbox"
          element={
            <RequireAuth loginPath="/affiliate/login">
              <DashboardInfluencerBox />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/influencerbox/:boxid"
          element={
            <RequireAuth loginPath="/affiliate/login">
              <DashboardBoxDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/campaigns/affiliate"
          element={
            <RequireAuth loginPath="/affiliate/login">
              <DashboardInfluencerCampaigns />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/campaigns/brand"
          element={
            <RequireAuth loginPath="/affiliate/login">
              <DashboardBrandCampaigns />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/campaigns/brand/create"
          element={
            <RequireAuth loginPath="/affiliate/login">
              <Dashboardcreatecampaign />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
