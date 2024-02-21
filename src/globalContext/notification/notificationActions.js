import * as types from "./types";

export const addUserNotification = (payload) => {
  return {
    type: types.ADD_USER_NOTIFICATION,
    payload,
  };
};

export const addSessionNotification = (payload) => {
  return {
    type: types.ADD_SESSION_NOTIFICATION,
    payload,
  };
};

export const errorNotification = (payload) => {
  return {
    type: types.ERROR_NOTIFICATION,
    payload,
  };
};

export const updateUserNotification = (payload) => {
  return {
    type: types.UPDATE_USER_NOTIFICATION,
    payload,
  };
};

export const updateSessionNotification = (payload) => {
  return {
    type: types.UPDATE_SESSION_NOTIFICATION,
    payload,
  };
};