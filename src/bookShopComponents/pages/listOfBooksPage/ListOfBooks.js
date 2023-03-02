import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { BOOKS_LIST_CONTEXT } from "./../../context/books-context";
import { SELECTED_PROVIDER } from "./../../context/selected-context";
import "./ListOfBooks.css";

import ListOfBooksMiniBook from "./miniComponents/ListOfBooksMiniBook";

export default function ListOfBooks() {
  const LIST_OF_BOOKS_FROM_CONTEXT = React.useContext(BOOKS_LIST_CONTEXT);
  const [BOOKS, setBooks] = useState();
  const [FILTER_BY_NAME, setFilterByName] = useState();
  const [FILTER_BY_RANGE, setFilterByRange] = useState();
  const LOCATION = useLocation();
  const NAVIGATE = useNavigate();

  if (!BOOKS) {
    new Promise((res) => {
      setTimeout(res, 500, LIST_OF_BOOKS_FROM_CONTEXT);
    }).then((e) => {
      setBooks(e.books);
    });
  }

  useEffect(() => {
    if (!LOCATION.state) {
      NAVIGATE("/");
    }

    toFilter({ name: FILTER_BY_NAME, range: FILTER_BY_RANGE });
  }, [FILTER_BY_NAME, FILTER_BY_RANGE]);

  function toFilter(options) {
    let allBooks = LIST_OF_BOOKS_FROM_CONTEXT.books;
    if (!options) return allBooks;
    let filteredBooks = allBooks;
    let { name, range } = options;
    const FILTER_OPTIONS = {
      1: {
        min: 0,
      },
      2: {
        min: 0,
        max: 15,
      },
      3: {
        min: 15,
        max: 30,
      },
      4: {
        min: 30,
      },
    };

    if (range || name) {
      name = name.toLowerCase() || "";
      range = range || 1;
      let filteredBooks1 = allBooks.filter(
        (book) => book.title.toLowerCase().indexOf(name) !== -1
      );

      filteredBooks = filteredBooks1.filter((book) => {
        if (FILTER_OPTIONS[range].max) {
          return (
            book.price > FILTER_OPTIONS[range].min &&
            book.price <= FILTER_OPTIONS[range].max
          );
        } else {
          return book.price > FILTER_OPTIONS[range].min;
        }
      });
    }

    setBooks(filteredBooks);
  }

  function handleFilter(e) {
    let { name, value } = e.target;

    if (name === "filterByName") {
      setFilterByName(value);
    } else if (name === "filterByRange") {
      setFilterByRange(value);
    }
  }

  function toFilterBooksPerName(e) {
    e.preventDefault();
  }
  return (
    <main className="bsMain">
      <form action="#" method="GET" onSubmit={toFilterBooksPerName}>
        <input
          onChange={handleFilter}
          type="search"
          placeholder="search by book name.."
          name="filterByName"
          id=""
        />

        <select name="filterByRange" id="priceOption" onChange={handleFilter}>
          <option value="1">Price</option>
          <option value="2">1-15</option>
          <option value="3">15-30</option>
          <option value="4">30+</option>
        </select>
      </form>
      <ul className="bookList">
        {BOOKS
          ? BOOKS.map((book, i) => {
              return (
                <SELECTED_PROVIDER key={i} value={book}>
                  <ListOfBooksMiniBook></ListOfBooksMiniBook>
                </SELECTED_PROVIDER>
              );
            })
          : null}
      </ul>
    </main>
  );
}
