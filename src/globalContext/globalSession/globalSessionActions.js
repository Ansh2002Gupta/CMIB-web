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

export const setSelectedSession = (payload) => {
  return {
    type: types.SET_SELECTED_SESSION,
    payload,
  };
};

export const setIsGettingGlobalSessionList = (payload) => {
  return {
    type: types.SET_IS_GETTING_GLOBAL_SESSION_LIST,
    payload,
  };
};
