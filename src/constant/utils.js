import moment from "moment";

export const formatDate = ({ date, dateFormat = "MM/DD/YYYY" }) => {
  if (date) {
    return moment(new Date(date)).format(dateFormat);
  }
  return moment(new Date()).format(dateFormat);
};

export const getErrorMessage = (errorObjectOrMessage) => {
  if (typeof errorObjectOrMessage === "string") {
    return errorObjectOrMessage;
  }
  return errorObjectOrMessage?.data?.message;
};
