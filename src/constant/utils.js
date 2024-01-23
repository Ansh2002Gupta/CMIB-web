import moment from "moment";
import {
  DEFAULT_PAGE_SIZE,
  SORT_VALUES,
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

export const toggleSorting = (currentSortValue) => {
  if (SORT_VALUES.ASCENDING === currentSortValue) {
    return SORT_VALUES.DESCENDING;
  }
  return SORT_VALUES.ASCENDING;
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

export function filterMenuData(modules, menuItems) {
  const filterdModules = [];

  modules &&
    modules?.map((item) => {
      if (item?.key && menuItems && item?.key in menuItems) {
        filterdModules?.push({
          id: item?.id,
          key: item?.key,
          label: item?.label,
          image: item?.image,
          isExperiencedMember: item?.isExperiencedMember,
          children: item?.children?.filter((e) =>
            menuItems[item?.key]?.items?.find(
              (findItem) => findItem?.key === e?.label
            )
          ),
        });
      }
    });
  return filterdModules;
}

export const getValidSortByValue = (currentSortByValue) => {
  if (
    currentSortByValue === SORT_VALUES.ASCENDING ||
    currentSortByValue === SORT_VALUES.DESCENDING
  ) {
    return currentSortByValue;
  }

  return SORT_VALUES.ASCENDING;
};
