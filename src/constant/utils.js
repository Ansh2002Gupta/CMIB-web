import moment from "moment";

export const formatDate = ({ date, dateFormat = "MM/DD/YYYY" }) => {
  if (date) {
    return moment(new Date(date)).format(dateFormat);
  }
  return moment(new Date()).format(dateFormat);
};

export const convertStringArrayToObjectOfStringAndIdArray = (
  stringArray,
  arrayOfObjectWithTextAndId
) => {
  const data = [];
  for (let i = 0; i < stringArray.length; i++) {
    for (let j = 0; j < arrayOfObjectWithTextAndId.length; j++) {
      if (typeof stringArray[i] === "object") {
        data.push(stringArray[i]);
        break;
      } else if (
        stringArray[i]?.toLowerCase() ===
        arrayOfObjectWithTextAndId[j].text?.toLowerCase()
      ) {
        data.push(arrayOfObjectWithTextAndId[j]);
      }
    }
  }
  return data;
};
