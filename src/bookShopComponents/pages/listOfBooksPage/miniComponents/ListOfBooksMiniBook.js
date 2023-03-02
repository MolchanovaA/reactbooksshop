import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { SELECTED_CONTEXT } from "../../../context/selected-context";

export default function ListOfBooksMiniBook({ helper }) {
  const NAVIGATE = useNavigate();
  const LOCATION = useLocation();

  const ITEM = React.useContext(SELECTED_CONTEXT);
  function redirectToSpecificBook() {
    NAVIGATE(`/book/${ITEM.id}`, {
      state: { userName: LOCATION.state.userName },
    });
  }

  function makeShortLength(title) {
    let arr = title.split("").splice(0, 24);
    return arr.join("") + "...";
  }

  return (
    <li>
      <img
        src={
          ITEM.image
            ? ITEM.image
            : "https://dino-chrome.com/static/images/dino.jpg"
        }
        alt={ITEM.title}
      />
      <div>
        <h2>
          {ITEM.title.split("").length > 24
            ? makeShortLength(ITEM.title)
            : ITEM.title}
        </h2>
        <h3>{ITEM.author}</h3>
        <p className="info__priceAndView">
          <span>Price {ITEM.price}</span>{" "}
          <button onClick={redirectToSpecificBook}>View</button>
        </p>
      </div>
    </li>
  );
}
