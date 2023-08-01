import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Component/Home";
import Indodax from "../Component/Indodax";
import Setting from "../Component/Setting";
import Help from "../Component/Help";

const RouteUrl = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="app">
            <Route index element={<Indodax />} />
            <Route path="setting" element={<Setting />} />
            <Route path="help" element={<Help />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteUrl;
