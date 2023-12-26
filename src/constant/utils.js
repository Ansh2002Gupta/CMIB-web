import moment from "moment";

export const FormatDate = (date) => {
  return date ? moment().format("MM/DD/YYYY") : moment().format("MM/DD/YYYY");
};
