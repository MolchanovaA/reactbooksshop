import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NavHeader({ accInfo }) {
  const [TROLLEYHINT, setTrolleyHint] = useState(null);
  const [USER_NAME, setUserName] = useState(accInfo);

  useEffect(() => {
    const LS_TROLLEY = localStorage.getItem("trolleyList");
    if (LS_TROLLEY) {
      setTrolleyHint(true);
    } else {
      setTrolleyHint(false);
    }
    const ICON = document.querySelector(".trolleyIcon");
    if (TROLLEYHINT) {
      ICON.classList.add("fullTrolleyColor");
    } else {
      ICON.classList.remove("fullTrolleyColor");
    }
  }, [TROLLEYHINT]);

  function toSignOutAndCleanLS() {
    localStorage.clear();
    sessionStorage.clear();
  }

  return (
    <>
      <nav>
        <Link
          to="/trolley"
          state={accInfo}
          className="bsHeader__nav__link "
          title="Trolley"
        >
          <i className="fa-solid fa-cart-shopping trolleyIcon "></i>
        </Link>
        <Link
          to="/"
          className="bsHeader__nav__link"
          onClick={toSignOutAndCleanLS}
          title="Sign Out"
        >
          <i className="fa-solid fa-right-from-bracket"></i>
        </Link>
        <Link to="*" className="bsHeader__nav__link" title="User">
          {USER_NAME.userName}
          <i className="fa-regular fa-face-smile"></i>
        </Link>
      </nav>
    </>
  );
}
