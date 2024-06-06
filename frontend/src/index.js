import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import Logged from "layouts/Logged";
import Public from "layouts/Public";
import Common from "layouts/Common";
import { Authenticate } from "scripts/authenticate";
import TeleBG from "layouts/TeleBG";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route element={<Authenticate requiredRole={"ANY"} />}>
        <Route path="/health/*" element={<Logged />} />
      </Route>
      <Route path="/public/*" element={<Public />} />
      <Route path="/common/*" element={<Common />} />
      <Route path="/tele/*" element={<TeleBG />} />
      <Route path="/" element={<Navigate to="/common/index" replace />} />
      {/* I can add page not found page here! */}
      {/* <Route path="*" element={<Navigate to="/health/index" replace />} /> */}
    </Routes>
  </BrowserRouter>
);
