import * as types from './types';
import { StorageService } from './../../services'

export const setAuth = (values) => {
  StorageService.set('auth', values)
  return {
    type: types.SET_AUTH,
    payload: { ...values },
  };
};

export const clearAuthAndLogout = () => {
  StorageService.removeAll()
  return {
    type: types.CLEAR_AUTH,
  };
};
