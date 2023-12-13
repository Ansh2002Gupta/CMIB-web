import { createContext, useReducer } from "react";
import * as types from "./types";

const initialState = {
  email: "",
  token: "",
};

const credentialsReducer = (state, action) => {
  switch (action.type) {
    case types.SAVE_EMAIL:
      return {
        ...state,
        ...action.payload,
      };
    case types.CLEAR_EMAIL:
      return {
        ...state,
        email: "",
      };
    case types.SAVE_TOKEN:
      return {
        ...state,
        ...action.payload,
      };
    case types.CLEAR_TOKEN:
      return {
        ...state,
        token: "",
      };
    default:
      return state;
  }
};

export const CredentialContext = createContext(initialState);

const CredentialsProvider = ({ children }) => {
  const [credentialsState, credentialsDispatch] = useReducer(
    credentialsReducer,
    initialState
  );

  return (
    <CredentialContext.Provider value={[credentialsState, credentialsDispatch]}>
      {children}
    </CredentialContext.Provider>
  );
};

export default CredentialsProvider;
