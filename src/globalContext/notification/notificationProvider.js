import React, { useReducer } from "react";
import * as types from "./types";

const initialState = {
  addUserSuccessfully: false,
  addSessionSuccessfully: false,
  updateUserSuccessfully: false,
  updateSessionSuccesssfully: false,
  updateInterviewDateSuccessfully: false,
  isError: false,
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case types.ADD_USER_NOTIFICATION:
      return {
        ...state,
        addUserSuccessfully: action.payload,
      };
    case types.ADD_SESSION_NOTIFICATION:
      return {
        ...state,
        addSessionSuccessfully: action.payload,
      };
    case types.ERROR_NOTIFICATION:
      return {
        ...state,
        isError: action.payload,
      };
    case types.UPDATE_USER_NOTIFICATION:
      return {
        ...state,
        updateUserSuccessfully: action.payload,
      };
    case types.UPDATE_SESSION_NOTIFICATION:
      return {
        ...state,
        updateSessionSuccessfully: action.payload,
      };
    case types.UPDATE_INTERVIEW_NOTIFICATION:
      return {
        ...state,
        updateInterviewDateSuccessfully: action.payload,
      };
    default:
      return state;
  }
};

export const NotificationContext = React.createContext([
  initialState,
  () => {},
]);

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
