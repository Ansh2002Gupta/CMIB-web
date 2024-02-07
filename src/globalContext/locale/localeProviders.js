import { createContext, useReducer } from 'react';
import * as types from './types';

const initialState = { locale: 'en' };

const localeReducer = (state, action) => {
  switch (action.type) {
    case types.SET_LOCALE:
      return {
        ...state,
        locale: action.payload,
      };
    default:
      return state;
  }
};

export const LocaleContext = createContext(initialState);

const LocaleProvider = ({ children }) => {
  const [localeState, localeDispatch] = useReducer(localeReducer, initialState);
  
  return (
    <LocaleContext.Provider value={[localeState, localeDispatch]}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleProvider;
