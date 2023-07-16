import React from "react";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import "./App.css";

import AffiliateLoginPage from "./pages/influencers/AffiliateLoginPage";
import AffiliateRegisterPage from "./pages/influencers/AffiliateRegisterPage";
import BrandLoginPage from "./pages/brands/BrandLoginPage";
import BrandRegisterPage from "./pages/brands/BrandRegisterPage";
import Dashboardprofile from "./pages/Dashboardprofile";
import Dashboardinfluencerhub from "./pages/Dashboardinfluencerhub";
import DashboardInfluencerBox from "./pages/brands/DashboardInfluencerBox"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/affiliate/login" element={<AffiliateLoginPage />} />
        <Route path="/brand/login" element={<BrandLoginPage />} />
        <Route path="/brand/register" element={<BrandRegisterPage />} />
        <Route path="/affiliate/register" element={<AffiliateRegisterPage />} />
        <Route
          path="/dashboard/profile/:id?"
          element={
            <RequireAuth loginPath="/affiliate/login">
              <Dashboardprofile />
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
      </Routes>
    </div>
  );
}

export default App;
