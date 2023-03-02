import React from "react";
import { Outlet } from "react-router-dom";
import "./pages/Reset.css";
import "./pages/GeneralHeaderFooterStyles.css";

import Header from "./pages/Header";
import Footer from "./pages/Footer";

export default function MainShopTemplate() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
