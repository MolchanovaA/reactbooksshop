import React from "react";
import listOfBooksJson from "./../listOfBooksJson.json";

export const BOOKS_LIST_CONTEXT = React.createContext(listOfBooksJson);
export const BOOKS_TROLLEY_CONTEXT = React.createContext("");

export const BOOKS_PROVIDER = BOOKS_LIST_CONTEXT.Provider;
export const TROLLEY_PROVIDER = BOOKS_TROLLEY_CONTEXT.Provider;
