import React, { useReducer } from "react";
import * as types from "./types";

const initialState = {
  isGettingUserDetails: false,
  userDetails: {},
  errorGettingUserDetails: "",
};

const userProfileReducer = (state, action) => {
  switch (action.type) {
    case types.SET_IS_GETTING_USER_DETAILS:
      return {
        ...state,
        isGettingUserDetails: action.payload,
      };

    case types.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: { ...state.userDetails, ...action.payload },
      };

    case types.SET_ERROR_GETTING_USER_DETAILS:
      return {
        ...state,
        errorGettingUserDetails: action.payload,
      };

    case types.RESET_USER_DETAILS:
      return initialState;

    default:
      return state;
  }
};

export const UserProfileContext = React.createContext([initialState, () => {}]);

const UserProfileProvider = ({ children }) => {
  const [userProfileDetails, userProfileDispatch] = useReducer(
    userProfileReducer,
    initialState
  );

  return (
    <UserProfileContext.Provider
      value={[userProfileDetails, userProfileDispatch]}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileProvider;
