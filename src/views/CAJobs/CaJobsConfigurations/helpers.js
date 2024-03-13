export const returnFieldObjects = ({ fieldValueList }) => {
  return fieldValueList.map((value, index) => {
    if (index === fieldValueList?.length - 1) {
      return { fieldValue: value, buttonType: "add", id: index };
    }
    return { fieldValue: value, buttonType: "remove", id: index };
  });
};
