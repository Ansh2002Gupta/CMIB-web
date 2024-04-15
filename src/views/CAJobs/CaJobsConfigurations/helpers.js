import { initialFieldState } from "./constant";

export const returnFieldObjects = ({ fieldValueList }) => {
  if (!fieldValueList?.length) return initialFieldState;
  const updatedFieldValueList = fieldValueList.map((value, index) => ({
    fieldValue: value,
    buttonType: "remove",
    id: index,
  }));
  return [
    ...updatedFieldValueList,
    { fieldValue: "", buttonType: "add", id: Date.now() },
  ];
};

export const removeInBetweenEmptyFields = ({ array, valueKeyName }) => {
  const arrayWithoutEmptyFields = array.filter((field, index) =>
    index !== array.length - 1 ? !!field?.[valueKeyName] : true
  );
  return arrayWithoutEmptyFields;
};

export const addEmptyRowAtLastIfAbsent = ({
  array,
  valueKeyName,
  actionKeyName,
}) => {
  let updatedArray = array.map((field, index) => {
    if (index === array.length - 1) {
      return !!field?.[valueKeyName]
        ? { ...field, [actionKeyName]: "remove" }
        : { ...field, error: "" };
    }
    return field;
  });
  if (
    updatedArray[updatedArray.length - 1]?.[actionKeyName]?.trim() === "remove"
  )
    updatedArray.push({
      [valueKeyName]: "",
      [actionKeyName]: "add",
      id: Date.now(),
    });
  return updatedArray;
};
