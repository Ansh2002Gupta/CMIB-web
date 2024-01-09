import variables from "../../../themes/base/styles/variables";

export const classes = {
  switchBackground: { backgroundColor: variables.greenBtnBg },
  bottomSectionStyle: {
    alignSelf: "flex-end",
    position: "fixed",
    bottom: variables.gapMedium,
    right: variables.gapMedium,
  },
  selectStyle: { width: variables.fullWidth },
  mainTopSection: {
    height: "calc(100% - 102px)",
    backgroundColor: variables.blueBg,
    padding: `${variables.paddingMedium} ${variables.paddingMedium} 0`,
  },
};
