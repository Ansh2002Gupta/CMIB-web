import React, { useReducer } from "react";
import * as types from "./types";

const initialState = {
  isUserSuccessfullyAdded: null,
  addSessionSuccessfully: false,
  updateSessionSuccesssfully: false,
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case types.USER_DETAIL_TOAST:
      return {
        ...state,
        isUserSuccessfullyAdded: action.payload,
      };

    case types.ADD_SESSION_NOTIFICATION: 
      return {
        ...state,
        addSessionSuccessfully: action.payload,
      }; 

    case types.UPDATE_SESSION_NOTIFICATION: 
      return {
        ...state,
        updateSessionSuccessfully: action.payload,
      };
    
    default:
      return state;
  }
};

export const NotificationContext = React.createContext([initialState, () => {}]);

const NotificationProvider = ({ children }) => {
  const [notificationState, setNotificationStateDispatch] = useReducer(
    notificationReducer,
    initialState
  );

  return (
    <NotificationContext.Provider
      value={[notificationState, setNotificationStateDispatch]}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
