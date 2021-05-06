import React, { createContext, useReducer } from "react";
import { commentReducer } from "../reducers/reducers";

export const commentglobalContext = createContext();

const initialComment = [];

export const CommentProvider = ({ children }) => {
  const [commentinfo, commentdispatch] = useReducer(
    commentReducer,
    initialComment
  );

  return (
    <commentglobalContext.Provider
      value={{
        commentinfo,
        commentdispatch,
      }}
    >
      {children}
    </commentglobalContext.Provider>
  );
};
