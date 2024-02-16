import variables from "../../themes/base/styles/variables";

export const classes = {
  cardBody: {
    padding: "0px",
    borderTop: variables.borderLight,
    borderBottom: variables.borderLight,
  },
  filterHeaderText: {
    fontSize: variables.fontSizeNormal,
    color: variables.textBold,
    fontWeight: variables.fontWeightBold,
  },
  filterLeftSectionMobile: {
    borderRight: variables.borderLight,
    flex: 2,
    maxHeight: "60vw",
    overflowX: "auto",
  },
  filterRightSectionMobile: {
    flex: 3,
    maxHeight: "60vw",
    overflowX: "auto",
  },
  leftSectionStyle: {
    borderRight: variables.borderLight,
    flex: 1,
    maxHeight: "20vw",
    overflowX: "auto",
    minWidth: "15vw",
  },
  rightSectionStyle: {
    flex: 1,
    maxHeight: "20vw",
    overflowX: "auto",
    minWidth: "15vw",
  },
};
