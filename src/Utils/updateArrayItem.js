export const updateArrayItem = ({
  array,
  keyValuePairObject,
  itemToBeUpdatedId,
}) => {
  const updatedInputFields = array.map((item) => {
    if (item?.id === itemToBeUpdatedId) {
      return { ...item, ...keyValuePairObject };
    }
    return item;
  });
  return updatedInputFields;
};
