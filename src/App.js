import React from "react";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import "./App.css";

import AffiliateLoginPage from "./pages/influencers/AffiliateLoginPage";
import AffiliateRegisterPage from "./pages/influencers/AffiliateRegisterPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/affiliate/login" element={<AffiliateLoginPage />} />
        <Route
          path="/dashboard/affiliate/profile"
          element={
            <RequireAuth loginPath="/affiliate/login">
              <div>Login</div>
            </RequireAuth>
          }
        />
      <Route path="/affiliate/register" element={<AffiliateRegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
