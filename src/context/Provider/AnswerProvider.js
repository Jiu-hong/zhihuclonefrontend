import React, { createContext, useReducer } from "react";
import { answersReducer } from "../reducers/reducers";

export const answerglobalContext = createContext();

const initialAnswer = [];

export const AnswerProvider = ({ children }) => {
  const [answerinfo, answerdispatch] = useReducer(
    answersReducer,
    initialAnswer
  );

  const store = React.useMemo(() => ({ answerinfo, answerdispatch }), [
    answerinfo,
  ]);

  return (
    <answerglobalContext.Provider value={store}>
      {children}
    </answerglobalContext.Provider>
  );
};
