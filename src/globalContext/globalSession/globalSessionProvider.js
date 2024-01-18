import React, { useReducer } from "react";
import * as types from "./types";

const initialState = {
  globalSessionId: '',
};

const globalSessionReducer = (state, action) => {
  switch (action.type) {
    case types.SET_GLOBAL_SESSION:
      return {
        ...state,
        globalSessionId: action.payload,
      };

    default:
      return state;
  }
};

export const GlobalSessionContext = React.createContext([initialState, () => {}]);

const GlobalSessionProvider = ({ children }) => {
  const [globalSessionDetails, globalSessionDispatch] = useReducer(
    globalSessionReducer,
    initialState
  );

  return (
    <GlobalSessionContext.Provider
      value={[globalSessionDetails, globalSessionDispatch]}
    >
      {children}
    </GlobalSessionContext.Provider>
  );
};

export default GlobalSessionProvider;
