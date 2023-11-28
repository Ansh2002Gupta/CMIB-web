import { createContext, useReducer } from 'react';
import * as types from './types';

const initialState = {
  count: 1,
};

const dashboardReducer = (state, action) => {
  switch (action.type) {
    case types.SET_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
};

export const DashboardContext = createContext(initialState);

export const DashboardProvider = ({ children }) => {
  const [dashboardState, dashboardDispatch] = useReducer(
    dashboardReducer,
    initialState
  );

  return (
    <DashboardContext.Provider value={[dashboardState, dashboardDispatch]}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
