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
import Dashboardcampaigns from "./pages/dashboard/DashboardCampaigns";
import Dashboardcreatecampaign from "./pages/dashboard/brands/DashboardCreateCampaign";
import Brandlandingpage from "./pages/brands/BrandLandingPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Brandlandingpage />} />
        <Route path="/affiliate/login" element={<AffiliateLoginPage />} />
        <Route path="/brand/login" element={<BrandLoginPage />} />
        <Route path="/brand/register" element={<BrandRegisterPage />} />
        <Route path="/affiliate/register" element={<AffiliateRegisterPage />} />
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
          path="/dashboard/campaigns"
          element={
            <RequireAuth loginPath="/affiliate/login">
              <Dashboardcampaigns />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/campaigns/create"
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
