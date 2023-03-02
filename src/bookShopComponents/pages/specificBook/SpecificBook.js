import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BOOKS_LIST_CONTEXT } from "./../../context/books-context";
import "./SpecificBook.css";

export default function SpecificBook() {
  let trolleyCount = 1;
  let [counter, setCounter] = useState(trolleyCount);
  let [storTrolley, setStorTrolley] = useState();
  const NAVIGATE = useNavigate();
  const LOCATION = sessionStorage.getItem("userName");
  const ID = useParams();
  const LIST_OF_BOOKS_FROM_CONTEXT = React.useContext(BOOKS_LIST_CONTEXT);

  const CURRENT_BOOK =
    LIST_OF_BOOKS_FROM_CONTEXT.books[ID.id - 1] ||
    LIST_OF_BOOKS_FROM_CONTEXT.books[
      LIST_OF_BOOKS_FROM_CONTEXT.books.length - 1
    ];

  const START_PRICE = CURRENT_BOOK.price;
  const [PRICE, setPrice] = useState(START_PRICE);
  function multiPrice(numberOfBooks = 0) {
    let fullPrice = numberOfBooks * START_PRICE;
    let roundedPrice = fullPrice.toFixed(2);

    return roundedPrice;
  }

  useMemo(() => {
    let priceNew = multiPrice(counter);

    if (priceNew > 0) {
      setPrice(priceNew);
    }
  }, [counter]);

  useEffect(() => {
    if (LOCATION && +ID.id < 42 && +ID.id > 0) {
      NAVIGATE(`/book/${ID.id}`);
    } else if (!LOCATION) {
      NAVIGATE("/");
    } else if ((LOCATION && +ID.id > 42) || (LOCATION && +ID.id <= 0)) {
      NAVIGATE("*");
    }

    let LS = JSON.parse(localStorage.getItem("trolleyList"));
    if (LS) {
      let bookCheck = LS.find((i) => i.bookId === +ID.id);
      if (bookCheck) {
        setCounter(bookCheck.count);
      }
    }

    setStorTrolley(LS);
  }, []);

  if (counter > 42) {
    counter = 42;
  } else if (counter < 1) {
    counter = 1;
  }

  function inputChange(e) {
    if (!isNaN(e.target.value) && e.target.value < 43) {
      setCounter(+e.target.value);
    }
  }

  function animateTrolley() {
    const TROLLEY_ICON = document.querySelector(".trolleyIcon");
    TROLLEY_ICON.classList.add("fullTrolleyAnimation");
    TROLLEY_ICON.classList.add("fullTrolleyColor");
    setTimeout(() => {
      TROLLEY_ICON.classList.remove("fullTrolleyAnimation");
    }, 3000);
  }

  function toSubmit(e) {
    e.preventDefault();
    if (!counter || !PRICE) return;

    animateTrolley();

    if (storTrolley) {
      //if SOME books in LS

      let list = JSON.parse(localStorage.getItem("trolleyList"));
      localStorage.removeItem("trolleyList");

      let bookExistsInLS = list.filter((item) => item.bookId === +ID.id);
      if (bookExistsInLS.length) {
        //if THIS books in LS
        list.forEach((item) => {
          if (item.bookId === +ID.id) {
            item.count = counter;
            item.totalPrice = +PRICE;
          }
        });
      } else {
        //if NO THIS book in LS
        list.push({
          bookId: CURRENT_BOOK.id,
          bookName: CURRENT_BOOK.title,
          count: counter,
          totalPrice: +PRICE,
        });
      }
      localStorage.setItem("trolleyList", JSON.stringify(list));
    } else {
      localStorage.setItem(
        "trolleyList",
        JSON.stringify([
          {
            bookId: CURRENT_BOOK.id,
            bookName: CURRENT_BOOK.title,
            count: counter,
            totalPrice: +PRICE,
          },
        ])
      );
    }

    localStorage.setItem("fullPrice", countFullPrice());
  }

  function countFullPrice() {
    let LScheck = JSON.parse(localStorage.getItem("trolleyList"));
    let fullPrice = LScheck.reduce((acc, cur) => {
      acc = acc + cur.totalPrice;
      return acc;
    }, 0);
    return fullPrice.toFixed(2);
  }

  return (
    <>
      <main className="bsMain" data-testid="specificTestId1">
        <section className="bsMain__bookPageContent">
          <div className="bsMain__bookBorder">
            <img
              src={
                CURRENT_BOOK.image
                  ? CURRENT_BOOK.image
                  : "https://dino-chrome.com/static/images/dino.jpg"
              }
              alt={CURRENT_BOOK.title}
            />
          </div>
          <div className="bsMain__bookDescr">
            <h1>{CURRENT_BOOK.title}</h1>
            <div>{CURRENT_BOOK.author}</div>
            <div>
              {CURRENT_BOOK.id}
              Book Level
            </div>
            <div>Book Tags</div>
          </div>
          <div className="bsMain__bookPrice">
            <form
              action="get"
              className="countBookForm"
              id="addBookForm"
              onSubmit={toSubmit}
            >
              <div>
                <span>Price, usd</span>{" "}
                <span id="basicPrice">{START_PRICE}</span>
              </div>
              <div>
                <span>Count</span>
                <div className="counterSection">
                  <input
                    data-testid="inputTest"
                    className="counterField"
                    type="text"
                    title="change count"
                    id="bookCounter"
                    value={counter}
                    onChange={inputChange}
                  />
                  <div className="counterButtons">
                    <button
                      data-testid="UpButtonTest"
                      className="up"
                      onClick={(e) => {
                        e.preventDefault();
                        setCounter(counter + 1);
                      }}
                    >
                      +
                    </button>
                    <button
                      data-testid="DownButtonTest"
                      className="down"
                      onClick={(e) => {
                        e.preventDefault();
                        setCounter(counter - 1);
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <span>Total price, usd</span>{" "}
                <span id="totalPrice" data-testid="priceTest">
                  {PRICE ? PRICE : START_PRICE}
                </span>
              </div>

              <input
                type="submit"
                value="Add to basket"
                id=""
                title="click to buy"
              />
            </form>
          </div>
        </section>
        <p className="fullBookDescription">{CURRENT_BOOK.description}</p>
      </main>
    </>
  );
}
