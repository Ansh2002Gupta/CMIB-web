import dayjs from "dayjs";

import { controlMenu, modules } from "../containers/SideMenu/sideMenuItems";
import { urlService } from "../Utils/urlService";
import {
  DEFAULT_PAGE_SIZE,
  FORM_STATES,
  GENERIC_ERROR_MESSAGE,
  PAGINATION_PROPERTIES,
  SORT_VALUES,
  VALID_ROW_PER_OPTIONS,
} from "./constant";

export const formatDate = ({ date, dateFormat = "DD/MM/YYYY" }) => {
  if (date && date !== undefined) {
    return dayjs(new Date(date)).format(dateFormat);
  }
  return dayjs(new Date()).format(dateFormat);
};

export const formatTime = ({ time, timeFormat = "h:mm A" }) => {
  if (time) {
    return dayjs(time).format(timeFormat);
  }
  return dayjs().format(timeFormat);
};

export const convertDateToStringDate = (date) => {
  return dayjs(date, "M-YYYY").format("MMM YYYY");
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
  } else if (SORT_VALUES.DESCENDING === currentSortValue) {
    return "";
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

export const convertPermissionFilter = (
  roles,
  singleOptionsGroupName,
  countFieldName
) => {
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
        optionId: parseInt(roles[key]?.id || key),
        str: roles[key]?.name,
        count: roles[key]?.[countFieldName],
      });
    }
  }

  return result;
};

export const isObjectHasNoValues = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] !== undefined) {
        return false;
      }
    }
  }
  return true;
};

export const getErrorMessage = (errorObjectOrMessage) => {
  if (typeof errorObjectOrMessage === "string") {
    return errorObjectOrMessage;
  }
  return errorObjectOrMessage?.data?.message;
};

export const getCurrentFormState = (
  currentQueryParamsValue,
  isUserIdAvailable
) => {
  if (!currentQueryParamsValue && !isUserIdAvailable) {
    return FORM_STATES.EMPTY;
  }
  if (
    currentQueryParamsValue?.toLowerCase() === FORM_STATES.EDITABLE ||
    currentQueryParamsValue?.toLowerCase() === FORM_STATES.VIEW_ONLY
  ) {
    return currentQueryParamsValue?.toLowerCase();
  }
  return FORM_STATES.VIEW_ONLY;
};

export const splitName = (fullName) => {
  const parts = fullName?.split(" ");
  const firstName = parts?.[0] || "";
  const lastName = parts?.slice(1)?.join(" ") || "";

  return { firstName, lastName };
};

export const getMessageInfo = (chatData, userDetails) => {
  if (
    chatData?.author?.type.toLowerCase() === "system" ||
    !chatData?.author?.type
  ) {
    return "system";
  }
  if (
    chatData?.author?.id === userDetails?.id &&
    (chatData?.author?.type.toLowerCase() === "admin" ||
      chatData?.author?.type.toLowerCase() === "super admin")
  ) {
    return "sender";
  }
  return "receiver";
};

export const getDateStatus = (record) => {
  const createdAt = new Date(record);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const createdAtDateString = createdAt.toDateString();
  const todayDateString = today.toDateString();
  const yesterdayDateString = yesterday.toDateString();

  if (createdAtDateString === todayDateString) {
    return "Today";
  } else if (createdAtDateString === yesterdayDateString) {
    return "Yesterday";
  } else {
    return formatDate(createdAt);
  }
};

export const getTime = (isoString) => {
  if (!isoString) {
    return "12:00 AM";
  }
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    return "12:00 AM";
  }
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedTime = `${hours}:${formattedMinutes} ${amPm}`;
  return formattedTime;
};

export const getSortQueryParamsValue = ({
  direction,
  keyName,
  stateKeyName,
}) => {
  direction = getSortingDirection(direction);
  if (keyName === stateKeyName) {
    return {
      direction,
      isDisable: false,
    };
  }
  return {
    direction: "asc",
    isDisable: true,
  };
};

export const getSortingDirection = (direction) => {
  direction = direction?.toLowerCase();
  if (direction === "asc" || direction === "desc") {
    return direction;
  }
  return "asc";
};

export const resetListingData = ({
  currentPage,
  fetchDataCallback,
  listData,
  setCurrent,
}) => {
  if (listData?.meta?.total) {
    const totalRecords = listData?.meta?.total;
    const numberOfPages = Math.ceil(totalRecords / listData?.meta?.perPage);
    if (currentPage > numberOfPages) {
      fetchDataCallback();
      urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
      setCurrent(1);
    }
  }
};

export const isUserAdmin = (userDetails) => {
  const noOfMenuItems = Object.keys(userDetails?.menu_items || {})?.length || 0;
  const noOfControlItems = userDetails?.menu_items?.control?.items?.length || 0;
  return (
    noOfMenuItems === modules?.length &&
    noOfControlItems === controlMenu?.length
  );
};

export const checkForValidNumber = (number) => {
  if (number || number === 0) {
    return true;
  }
  return false;
};

export const getTimeWithZeroSec = (time) => {
  return `${time.split(":")?.slice(0, 2).join(":")}:00`;
}
