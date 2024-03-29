import React, { useReducer } from "react";
import * as types from "./types";

const initialState = {
  roundOneCenters: [],
  roundTwoCenters: [],
};

const roundDetailsReducer = (state, action) => {
  switch (action.type) {
    case types.SET_ROUND_ONE_CENTERS:
      return {
        ...state,
        roundOneCenters: [...action.payload],
      };
    case types.SET_ROUND_TWO_CENTERS:
      return {
        ...state,
        roundTwoCenters: [...action.payload],
      };

    default:
      return state;
  }
};

export const RoundDetailsContext = React.createContext([
  initialState,
  () => {},
]);

const RoundDetailsProvider = ({ children }) => {
  const [roundDetailState, setRoundDetailsDispatch] = useReducer(
    roundDetailsReducer,
    initialState
  );

  return (
    <RoundDetailsContext.Provider
      value={[roundDetailState, setRoundDetailsDispatch]}
    >
      {children}
    </RoundDetailsContext.Provider>
  );
};

export default RoundDetailsProvider;
