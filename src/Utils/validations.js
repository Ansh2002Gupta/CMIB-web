import { MIN_SEARCH_TEXT_LENGTH } from "../constant/constant";

export const validateSearchTextLength = (str) => {
  return str.length > MIN_SEARCH_TEXT_LENGTH ? str : "";
};
