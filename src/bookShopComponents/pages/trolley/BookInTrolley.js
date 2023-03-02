import React from "react";

export default function BookInTrolley({ book }) {
  return (
    <>
      <li className="listOfBooksInTrolley__count row">
        <span className="col-4">{book.bookName}</span>
        <span className="col-4"> {book.count}</span>
        <span className="col-4 text-end">{book.totalPrice}</span>
      </li>
    </>
  );
}
