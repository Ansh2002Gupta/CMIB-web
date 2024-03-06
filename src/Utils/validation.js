import { FORM_STATES } from "../constant/constant";
import dayjs from "dayjs";

export const getValidMode = (mode) => {
  if (
    mode?.toLowerCase() === FORM_STATES.EDITABLE ||
    mode?.toLowerCase() === FORM_STATES.VIEW_ONLY
  ) {
    return mode?.toLowerCase();
  } else return FORM_STATES.VIEW_ONLY;
};

export const isOverlapping = (time, startTime2, endTime2) => {
  return (
    dayjs(time, "HH:mm:ss").isAfter(dayjs(startTime2, "HH:mm:ss")) &&
    dayjs(time, "HH:mm:ss").isBefore(dayjs(endTime2, "HH:mm:ss"))
  );
};
