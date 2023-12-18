import variables from "../../themes/base/styles/variables";

export const classes = {
  topSection: {
    position: "sticky",
    top: 0,
    zIndex: 999999,
    padding: variables.paddingSmall,
    backgroundColor: "var(--secondary-bg)",
  },
  middleSection: {
    flexGrow: 1,
    padding: "10px",
  },
  bottomSection: {
    position: "sticky",
    bottom: 0,
    zIndex: 999,
  },
};
