import * as types from "./types";

export const userDetailToast = (payload) => {
  return {
    type: types.USER_DETAIL_TOAST,
    payload,
  };
};
