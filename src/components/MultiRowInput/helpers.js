export const returnEmptyRow = (valueKeyName) => {
  return {
    id: Date.now(),
    [valueKeyName]: "",
    buttonType: "add",
  };
};
