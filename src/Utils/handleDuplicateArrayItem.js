export const handleDuplicateArrayItems = ({
  array,
  errorMessage,
  uniqueArrayItems,
}) => {
  return array.map((item) => {
    if (
      uniqueArrayItems.some(
        (obj) => item?.fieldValue === obj?.value && item?.id !== obj?.id
      )
    )
      return { ...item, error: errorMessage };
    return {
      ...item,
      error: item?.error?.trim()
        ? item?.error?.trim() !== errorMessage
          ? item?.error?.trim()
          : ""
        : "",
    };
  });
};
