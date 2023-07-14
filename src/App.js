import React from "react";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import "./App.css";

import AffiliateLoginPage from "./pages/influencers/AffiliateLoginPage";
import AffiliateRegisterPage from "./pages/influencers/AffiliateRegisterPage";
import Dashboardprofile from "./pages/Dashboardprofile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/affiliate/login" element={<AffiliateLoginPage />} />
        <Route path="/affiliate/register" element={<AffiliateRegisterPage />} />
        <Route
          path="/dashboard/profile"
          element={
            <RequireAuth loginPath="/affiliate/login">
              <Dashboardprofile/>
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
