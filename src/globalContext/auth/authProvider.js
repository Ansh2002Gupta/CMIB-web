import { createContext, useReducer } from 'react';
import { StorageService } from '../../services';
import * as types from './types';

const initialState = StorageService.get('auth');

const authReducer = (state, action) => {
  switch (action.type) {
    case types.SET_AUTH:
      return {
        ...state,
        ...action.payload,
      };
    case types.CLEAR_AUTH:
      return ({});
    default:
      return state;
  }
};

export const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialState);
  
  return (
    <AuthContext.Provider value={[authState, authDispatch]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
