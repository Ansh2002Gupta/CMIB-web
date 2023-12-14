import * as types from "./types";

export const saveRememberMe = (values) => {
  return {
    type: types.SAVE_REMEMBER_ME,
    payload: { ...values },
  };
};

export const clearRememberMe = () => {
  return {
    type: types.CLEAR_REMEMBER_ME,
  };
};
