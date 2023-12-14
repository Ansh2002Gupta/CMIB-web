import { createContext, useReducer } from "react";
import * as types from "./types";

const initialState = {
  rememberMe: false,
};

const userLoginReducer = (state, action) => {
  switch (action.type) {
    case types.SAVE_REMEMBER_ME:
      return {
        ...state,
        ...action.payload,
      };
    case types.CLEAR_REMEMBER_ME:
      return {
        ...state,
        rememberMe: false,
      };
    default:
      return state;
  }
};

export const UserLoginContext = createContext(initialState);

const UserLoginProvider = ({ children }) => {
  const [userLoginState, userLoginDispatch] = useReducer(
    userLoginReducer,
    initialState
  );

  return (
    <UserLoginContext.Provider value={[userLoginState, userLoginDispatch]}>
      {children}
    </UserLoginContext.Provider>
  );
};

export default UserLoginProvider;
