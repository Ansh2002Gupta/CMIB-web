import moment from "moment";

export const FormatDate = (date) => {
  if (date) {
    return moment(date).format("MM/DD/YYYY");
  }
  return moment().format("MM/DD/YYYY");
};
