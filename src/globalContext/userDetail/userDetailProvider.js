import React, { useReducer } from "react";
import * as types from "./types";

const initialState = {
  isUserSuccessfullyAdded: false,
};

const userDetailReducer = (state, action) => {
  switch (action.type) {
    case types.USER_DETAIL_TOAST:
      return {
        ...state,
        isUserSuccessfullyAdded: action.payload,
      };

    default:
      return state;
  }
};

export const UserDetailContext = React.createContext([initialState, () => {}]);

const UserDetailProvider = ({ children }) => {
  const [userDetailState, setUserDetailDispatch] = useReducer(
    userDetailReducer,
    initialState
  );

  return (
    <UserDetailContext.Provider
      value={[userDetailState, setUserDetailDispatch]}
    >
      {children}
    </UserDetailContext.Provider>
  );
};

export default UserDetailProvider;
