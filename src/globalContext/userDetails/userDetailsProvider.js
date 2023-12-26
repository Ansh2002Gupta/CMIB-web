import { createContext, useReducer } from "react";
import * as types from "./types";
import { FORM_STATES } from "../../constant/constant";

// TODO: Have to remove the default values once the routing issue is resolved.
// const initialState = {
//   userName: "Pankaj 9919",
//   type: "user",
//   editable: false,
//   userId: 2,
// };
const initialState = {
  userName: "Empty",
  type: "user",
  formState: FORM_STATES.EMPTY,
  userId: 0,
};

const userDetailsReducer = (state, action) => {
  switch (action.type) {
    case types.SET_USER_DETAILS:
      return {
        ...state,
        ...action.payload,
      };
    case types.CLEAR_USER_DETAILS:
      return {
        userName: "",
        type: "",
        editable: false,
        userId: null,
      };
    default:
      return state;
  }
};

export const UserDetailsContext = createContext(initialState);

const UserDetailsProvider = ({ children }) => {
  const [userDetailsState, userDetailsDispatch] = useReducer(
    userDetailsReducer,
    initialState
  );

  return (
    <UserDetailsContext.Provider
      value={[userDetailsState, userDetailsDispatch]}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};

export default UserDetailsProvider;
