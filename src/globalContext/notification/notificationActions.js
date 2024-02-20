import * as types from "./types";

export const userDetailToast = (payload) => {
  return {
    type: types.USER_DETAIL_TOAST,
    payload,
  };
};

export const addSessionNotification = (payload) => {
  return {
    type: types.ADD_SESSION_NOTIFICATION,
    payload,
  };
};

export const updateSessionNotification = (payload) => {
  return {
    type: types.UPDATE_SESSION_NOTIFICATION,
    payload,
  };
};