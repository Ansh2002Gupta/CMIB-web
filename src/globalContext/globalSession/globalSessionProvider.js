import React, { useReducer } from "react";
import * as types from "./types";

const initialState = {
  globalSessionId: "",
  globalSessionList: [],
  selectedSession: {},
  isGettingGlobalSessions: false,
};

const globalSessionReducer = (state, action) => {
  switch (action.type) {
    case types.SET_GLOBAL_SESSION:
      return {
        ...state,
        globalSessionId: action.payload,
      };
    case types.SET_GLOBAL_SESSION_LIST:
      return {
        ...state,
        globalSessionList: action.payload,
      };
    case types.SET_SELECTED_SESSION:
      return {
        ...state,
        selectedSession: action.payload,
      };
    case types.SET_IS_GETTING_GLOBAL_SESSION_LIST:
      return {
        ...state,
        isGettingGlobalSessions: action.payload,
      };
    default:
      return state;
  }
};

export const GlobalSessionContext = React.createContext([
  initialState,
  () => {},
]);

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
