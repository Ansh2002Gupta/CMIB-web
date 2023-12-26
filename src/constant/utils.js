import moment from "moment";

export const FormatDate = (date) => {
  return date ? date.format("MM/DD/YYYY") : moment().format("MM/DD/YYYY");
};
