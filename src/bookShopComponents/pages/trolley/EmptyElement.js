import React from "react";

export default function EmptyElement() {
  return (
    <li className="empty row">
      <span className="empty">
        <i className="fa-solid fa-cart-shopping"></i>
        Cart is empty..
      </span>
    </li>
  );
}
