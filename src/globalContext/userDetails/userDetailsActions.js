import * as types from "./types";

export const setUserDetails = (values) => {
  return {
    type: types.SET_USER_DETAILS,
    payload: { ...values },
  };
};

export const clearUserDetails = () => {
  return {
    type: types.CLEAR_USER_DETAILS,
  };
};
