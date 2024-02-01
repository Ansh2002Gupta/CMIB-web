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

export const getErrorText = (errorText) => {
  if (errorText) {
    return errorText;
  }
  return GENERIC_ERROR_MESSAGE;
};

export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export default async function getCroppedImg(
  imageSrc,
  pixelCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  // croppedAreaPixels values are bounding box relative
  // extract the cropped image using these values
  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image at the top left corner
  ctx.putImageData(data, 0, 0);

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      file.name = "cropped.jpeg";
      resolve({ file: file, url: URL.createObjectURL(file) });
    }, "image/jpeg");
  });
}

export const getImageSource = (uploadedImage) => {
  if (uploadedImage && typeof uploadedImage === "string") {
    return uploadedImage;
  }
  if (uploadedImage) {
    return URL.createObjectURL(uploadedImage);
  }
  return "";
};
