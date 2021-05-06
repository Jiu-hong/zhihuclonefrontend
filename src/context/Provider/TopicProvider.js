import React, { createContext, useReducer } from "react";

import { topicsReducer } from "../reducers/topicreducer";

export const topicglobalContext = createContext();

const initialTopic = [];

export const TopicProvider = ({ children }) => {
  const [topicinfo, topicdispatch] = useReducer(topicsReducer, initialTopic);

  return (
    <topicglobalContext.Provider
      value={{
        topicinfo,
        topicdispatch,
      }}
    >
      {children}
    </topicglobalContext.Provider>
  );
};
