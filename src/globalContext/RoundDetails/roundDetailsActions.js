import * as types from "./types";

export const setRoundOneCenters = (payload) => {
  return {
    type: types.SET_ROUND_ONE_CENTERS,
    payload,
  };
};

export const setRoundTwoCenters = (payload) => {
  return {
    type: types.SET_ROUND_TWO_CENTERS,
    payload,
  };
};
