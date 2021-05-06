import React, { createContext, useReducer } from "react";
import { userReducer } from "../reducers/reducers";

export const userglobalContext = createContext();

const initialUser = "";

export const UserProvider = ({ children }) => {
  const [userinfo, userdispatch] = useReducer(userReducer, initialUser);

  return (
    <userglobalContext.Provider
      value={{
        userinfo,
        userdispatch,
      }}
    >
      {children}
    </userglobalContext.Provider>
  );
};
