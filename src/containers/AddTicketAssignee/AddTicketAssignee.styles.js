import variables from "../../themes/base/styles/variables";

export const classes = {
  bottonContainer: {},
  middleContainer: {
    backgroundColor: variables.blueBg,
    maxHeight: "50vh",
    minHeight: "40vh",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  buttonContainer: {
    flex: 1,
    width: variables.fullWidth,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: variables.blueBg,
    paddingTop: variables.paddingExtraSmall,
    paddingBottom: variables.paddingMedium,
    backgroundColor: variables.blueBg,
    borderRadius: variables.radiusXLg,
  },
  crossIcon: {
    height: variables.height_20,
    width: variables.width_20,
  },
  assigneeTextContainer: { width: "90%" },
};
