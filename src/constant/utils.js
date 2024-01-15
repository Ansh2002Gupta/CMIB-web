import moment from "moment";
import { DEFAULT_PAGE_SIZE, VALID_ROW_PER_OPTIONS } from "./constant";

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

export function getValidPageNumber(currentPageNumber) {
  let validCurrentPage = +currentPageNumber;
  if (!validCurrentPage || isNaN(validCurrentPage) || validCurrentPage <= 0) {
    validCurrentPage = 1;
  }

  return validCurrentPage;
}

export function getValidPageSize(currentPageSize) {
  let validPageSize = +currentPageSize;
  if (
    !validPageSize ||
    isNaN(validPageSize) ||
    !VALID_ROW_PER_OPTIONS.includes(validPageSize)
  ) {
    validPageSize = DEFAULT_PAGE_SIZE;
  }
  return validPageSize;
}

export function getAccessibleModules(userDetails, modules) {
  const userRoles = userDetails.role.map((role) => role.slug);
  const accessibleModules = modules.filter((module) => {
    return userRoles.includes(module.key.slice(1));
  });

  return accessibleModules;
}
