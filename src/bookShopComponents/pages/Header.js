import React from "react";
import { Link, useLocation } from "react-router-dom";
import NavHeader from "./NavHeader.js";

export default function Header() {
  const USER = sessionStorage.getItem("userName");
  const LOCATION = useLocation();
  const ACC_INFO = LOCATION.state || USER;

  return (
    <header className="bsHeader">
      <Link
        to="/listofbooks"
        className="bsHeader__defLink"
        title="to main page"
        state={ACC_INFO}
      >
        This BookStore /\/{" "}
        <span className="fullName">X-course task / Alina Molchanova</span>
      </Link>

      {ACC_INFO ? <NavHeader accInfo={ACC_INFO} /> : null}
    </header>
  );
}
