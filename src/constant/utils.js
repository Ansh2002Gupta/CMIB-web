import dayjs from "dayjs";
import {
  DEFAULT_PAGE_SIZE,
  GENERIC_ERROR_MESSAGE,
  SORT_VALUES,
  VALID_ROW_PER_OPTIONS,
} from "./constant";

export const formatDate = ({ date, dateFormat = "MM/DD/YYYY" }) => {
  if (date) {
    return dayjs(new Date(date)).format(dateFormat);
  }
  return dayjs(new Date()).format(dateFormat);
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

export function getValidFilter(currentFilter) {
  let decodedFilter;
  try {
    const filterParam = currentFilter || "[]";
    decodedFilter = JSON.parse(decodeURIComponent(filterParam));
  } catch (e) {
    console.error("Failed to decode filter parameter:", e);
    // Fallback to an empty array or some default value
    decodedFilter = [];
  }
  return decodedFilter;
}

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

export const toggleSorting = (currentSortValue) => {
  if (SORT_VALUES.ASCENDING === currentSortValue) {
    return SORT_VALUES.DESCENDING;
  }
  return SORT_VALUES.ASCENDING;
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

export const getErrorText = (errorText) => {
  if (errorText) {
    return errorText;
  }
  return GENERIC_ERROR_MESSAGE;
};

export const getImageSource = (uploadedImage) => {
  if (uploadedImage && typeof uploadedImage === "string") {
    return uploadedImage;
  }
  if (uploadedImage) {
    return URL.createObjectURL(uploadedImage);
  }
  return "";
};

export const convertPermissionFilter = (roles, singleOptionsGroupName) => {
  let result = [
    {
      id: 1,
      name: singleOptionsGroupName || "Access",
      isSelected: false,
      options: [],
    },
  ];

  for (const key in roles) {
    if (roles.hasOwnProperty(key)) {
      result[0].options.push({
        optionId: parseInt(key),
        str: roles[key]?.name,
        query_count: roles[key]?.query_count,
      });
    }
  }

  return result;
};
