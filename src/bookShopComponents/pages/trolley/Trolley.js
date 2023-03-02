import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import EmptyElement from "./EmptyElement";
import BookInTrolley from "./BookInTrolley";

import "./Trolley.css";

export default function Trolley() {
  const LOCATION = useLocation();
  const USER = sessionStorage.getItem("userName");
  const NAVIGATE = useNavigate();
  const [TROLLEY_BOOKS, setTrolleyBooks] = useState(
    JSON.parse(localStorage.getItem("trolleyList"))
  );
  const [TROLLEY_FULLNESS_FLAG, setTrolleyFullnessFlag] = useState(
    localStorage.getItem("trolleyList")
  );

  const [TROLLEY_FULL_PRICE, setTPrice] = useState(
    localStorage.getItem("fullPrice")
  );

  useEffect(() => {
    if (!LOCATION.state || !USER) {
      NAVIGATE("/");
    }
    let purchaseButtonElement = document.querySelector(".purchaseButton");
    TROLLEY_FULLNESS_FLAG
      ? purchaseButtonElement.classList.remove("disabledButton")
      : purchaseButtonElement.classList.add("disabledButton");
  });

  function toDoPurchase() {
    if (!TROLLEY_BOOKS) return;
    setTrolleyBooks([]);
    setTrolleyFullnessFlag(false);
    TROLLEY_BOOKS.length = 0;
    localStorage.clear();
    sessionStorage.clear();
    LOCATION.state = {};
  }

  return (
    <main className="bsMain">
      <section className="emptyTrolley ">
        {TROLLEY_FULLNESS_FLAG ? (
          <button className="purchaseButton" onClick={toDoPurchase}>
            Purchase
          </button>
        ) : (
          <button className="purchaseButton" disabled onClick={toDoPurchase}>
            Purchase
          </button>
        )}

        <ul className="listOfBooksInTrolley container ">
          {TROLLEY_FULLNESS_FLAG
            ? TROLLEY_BOOKS.map((el, i) => <BookInTrolley book={el} key={i} />)
            : null}

          {TROLLEY_FULLNESS_FLAG ? (
            <li className="listOfBooksInTrolley__total fullPrice row">
              <span className="col-8"></span>
              <span className="col-4 text-end">
                Total Price, {TROLLEY_FULL_PRICE}$
              </span>
            </li>
          ) : (
            <EmptyElement />
          )}
        </ul>
      </section>
    </main>
  );
}
