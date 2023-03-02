import React from "react";
import { Routes, Route } from "react-router-dom";

import MainShopTemplate from "../MainShopTemplate";
import ListOfBooks from "./../pages/listOfBooksPage/ListOfBooks";
import SignIn from "./../pages/signInPages/SingIn";
import Trolley from "./../pages/trolley/Trolley";
import SpecificBook from "./../pages/specificBook/SpecificBook";
import ErrorPage from "./../pages/errorPage/ErrorPage";

export default function ReactRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainShopTemplate />}>
        <Route index element={<SignIn />} />
        <Route path="listofbooks" element={<ListOfBooks />} />
        <Route path="book/:id" element={<SpecificBook />} />
        <Route path="trolley" element={<Trolley />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
