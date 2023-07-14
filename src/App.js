import React from "react";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import "./App.css";

import AffiliateLoginPage from "./pages/influencers/AffiliateLoginPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/affiliate/login" element={<AffiliateLoginPage />} />
        <Route
          path="/dashboard/affiliate/profile"
          element={
            <RequireAuth loginPath="/affiliate/login">
              "Hello World"
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
