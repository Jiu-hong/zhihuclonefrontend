import React, { createContext, useState } from "react";

export const errorglobalContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [errMessage, setErrMessage] = useState("");
  return (
    <errorglobalContext.Provider value={{ errMessage, setErrMessage }}>
      {children}
    </errorglobalContext.Provider>
  );
};
