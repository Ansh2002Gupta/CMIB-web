import * as types from './types';

export const setLocale = (value) => {
  return {
    type: types.SET_LOCALE,
    payload: value,
  };
};
