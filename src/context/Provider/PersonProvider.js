import React, { createContext, useReducer } from "react";
import { personReducer } from "../reducers/reducers";

export const personglobalContext = createContext();

const initialPerson = [];

export const PersonProvider = ({ children }) => {
  const [personinfo, persondispatch] = useReducer(personReducer, initialPerson);

  const store = React.useMemo(() => ({ personinfo, persondispatch }), [
    personinfo,
  ]);

  // const [errMessage, setErrMessage] = useState("");

  return (
    <personglobalContext.Provider value={store}>
      {children}
    </personglobalContext.Provider>
  );
};
