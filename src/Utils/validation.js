import { FORM_STATES } from "../constant/constant";

export const getValidMode = (mode) => {
  if (
    mode?.toLowerCase() === FORM_STATES.EDITABLE ||
    mode?.toLowerCase() === FORM_STATES.VIEW_ONLY
  ) {
    return mode?.toLowerCase();
  } else return FORM_STATES.VIEW_ONLY;
};
