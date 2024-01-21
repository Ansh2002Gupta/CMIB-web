import moment from "moment";
import {
  DEFAULT_PAGE_SIZE,
  SORT_DIRECTIONS,
  VALID_ROW_PER_OPTIONS,
} from "./constant";

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

export const getErrorMessage = (errorObjectOrMessage) => {
  if (typeof errorObjectOrMessage === "string") {
    return errorObjectOrMessage;
  }
  return errorObjectOrMessage?.data?.message;
};

export function getCurrentActiveTab(currentTabValue, validTabsValueArray) {
  if (!currentTabValue || !validTabsValueArray.includes(currentTabValue)) {
    return "1";
  }
  return currentTabValue;
}

export const getAccessibleModules = (useRoles, modules) => {
  const filteredModules = modules?.filter((module) => {
    const hasPermission = useRoles?.some((roleModule) => {
      return roleModule?.slug?.toLowerCase() === module?.key?.toLowerCase();
    });
    if (hasPermission) {
      return true;
    }
    if (module.subMenu) {
      module.subMenu = module.subMenu?.filter((subModule) => {
        return useRoles?.some((roleModule) => {
          return (
            roleModule?.name?.toLowerCase() === subModule?.key?.toLowerCase()
          );
        });
      });
      return module.subMenu.length > 0;
    }

    return false;
  });

  return filteredModules;
};

export const toggleSortDirection = (direction) => {
  if (direction === SORT_DIRECTIONS.ASCENDING) {
    return SORT_DIRECTIONS.DESCENDING;
  }
  return SORT_DIRECTIONS.ASCENDING;
};
