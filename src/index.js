import React from "react";
import ReactDOM from "react-dom/client";
import { BOOKS_PROVIDER } from "./../src/bookShopComponents/context/books-context";
import listOfBooksJson from "./../src/bookShopComponents/listOfBooksJson.json";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, HashRouter } from "react-router-dom";

import ReactRoutes from "./bookShopComponents/routes/ReactRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <React.StrictMode>
      <BOOKS_PROVIDER value={listOfBooksJson}>
        <HashRouter>
          <ReactRoutes />
        </HashRouter>
      </BOOKS_PROVIDER>
    </React.StrictMode>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
