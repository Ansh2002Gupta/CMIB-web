import moment from "moment";

export const formatDate = ({ date, dateFormat = "MM/DD/YYYY" }) => {
  if (date) {
    return moment(new Date(date)).format(dateFormat);
  }
  return moment(new Date()).format(dateFormat);
};
