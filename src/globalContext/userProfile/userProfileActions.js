import * as types from "./types";

export const setIsGettingUserDetails = (payload) => {
  return {
    type: types.SET_IS_GETTING_USER_DETAILS,
    payload,
  };
};

export const setErrorGetingUserDetails = (payload) => {
  return {
    type: types.SET_ERROR_GETTING_USER_DETAILS,
    payload,
  };
};

export const setUserDetails = (payload) => {
  return {
    type: types.SET_USER_DETAILS,
    payload,
  };
};

export const resetUserDetails = () => {
  return {
    type: types.RESET_USER_DETAILS,
  };
};
