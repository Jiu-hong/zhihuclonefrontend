import React, { createContext, useReducer } from "react";

import { searchReducer } from "../reducers/searchreducer";

export const searchglobalContext = createContext();

const initialSearch = [];

export const SearchProvider = ({ children }) => {
  const [searchinfo, searchdispatch] = useReducer(searchReducer, initialSearch);

  return (
    <searchglobalContext.Provider
      value={{
        searchinfo,
        searchdispatch,
      }}
    >
      {children}
    </searchglobalContext.Provider>
  );
};
