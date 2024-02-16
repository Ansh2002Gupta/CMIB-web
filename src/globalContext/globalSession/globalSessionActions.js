import * as types from "./types";

export const setGlobalSessionDetails = (payload) => {
  return {
    type: types.SET_GLOBAL_SESSION,
    payload,
  };
};

export const setGlobalSessionList = (payload) => {
  return {
    type: types.SET_GLOBAL_SESSION_LIST,
    payload,
  };
};
