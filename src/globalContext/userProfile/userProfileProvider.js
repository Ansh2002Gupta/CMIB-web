import React, { useReducer } from "react";
import * as types from "./types";

const initialState = {
  isGettingUserDetails: false,
  selectedModuleItem: null,
  userDetails: {},
  errorGettingUserDetails: "",
  showLogoutModal: false,
  currentlyOpenedUserProfileModal: 0,
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

    case types.SET_SELECTED_MODULE_:
      return {
        ...state,
        selectedModuleItem: action.payload,
      };

    case types.SET_ERROR_GETTING_USER_DETAILS:
      return {
        ...state,
        errorGettingUserDetails: action.payload,
      };

    case types.SET_SHOW_CHANGE_PASSWORD_MODAL:
      return {
        ...state,
        showChangePasswordModal: action.payload,
      };

    case types.RESET_USER_DETAILS:
      return initialState;

    case types.SET_SHOW_LOGOUT_MODAL:
      return {
        ...state,
        showLogoutModal: action.payload,
      };

    case types.SET_USER_PROFILE_MODAL_NUMBER:
      return {
        ...state,
        currentlyOpenedUserProfileModal: action.payload,
      };

    case types.CLOSE_USER_PROFILE_MODAL:
      return {
        ...state,
        currentlyOpenedUserProfileModal: 0,
      };

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
