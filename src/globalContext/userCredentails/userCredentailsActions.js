import * as types from "./types";

export const saveEmail = (values) => {
  return {
    type: types.SAVE_EMAIL,
    payload: { ...values },
  };
};

export const clearEmail = () => {
  return {
    type: types.CLEAR_EMAIL,
  };
};

export const saveToken = (values) => {
  return {
    type: types.SAVE_TOKEN,
    payload: { ...values },
  };
};

export const clearToken = () => {
  return {
    type: types.CLEAR_TOKEN,
  };
};
