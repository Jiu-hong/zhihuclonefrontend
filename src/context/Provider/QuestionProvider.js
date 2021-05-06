import React, { createContext, useReducer } from "react";
import { questionsReducer } from "../reducers/reducers";

export const questionglobalContext = createContext();

const initialQuestion = [];

export const QuestionProvider = ({ children }) => {
  const [questioninfo, questiondispatch] = useReducer(
    questionsReducer,
    initialQuestion
  );

  return (
    <questionglobalContext.Provider
      value={{
        questioninfo,
        questiondispatch,
      }}
    >
      {children}
    </questionglobalContext.Provider>
  );
};
