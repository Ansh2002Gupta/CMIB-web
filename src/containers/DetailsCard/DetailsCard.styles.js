import variables from "../../themes/base/styles/variables";

export const classes = {
  mainStyle: {
    backgroundColor: variables.bodyBg,
    border: variables.borderLight,
    borderRadius: variables.radiusMLg,
    padding: variables.paddingMedium,
    gap: variables.gapMedium,
  },
  linkStyles: {
    color: variables.linkColor,
    textDecoration: "underline",
  },
  quillContainerStyle: {
    flex: 1,
    display: "flex",
    backgroundColor: variables.bodyBg,
  },
  quilStyle: {
    flex: 1,
    border: variables.borderLight,
    borderRadius: variables.radiusLg,
    backgroundColor: variables.bodyBg,
  },
};
