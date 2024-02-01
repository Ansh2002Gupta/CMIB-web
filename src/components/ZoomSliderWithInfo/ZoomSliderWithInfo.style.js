import variables from "../../themes/base/styles/variables";

export const classes = {
  zoomInfoContainer: {
    marginTop: `${variables.margin_32}`,
    flexDirection: "row",
    gap: `${variables.gapSmall}`,
    alignItems: "center",
    display: "flex",
    gap: "8px",
    width: "100%",
  },
  sliderBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: `${variables.gapXSmall}`,
    flex: 1,
    display: "flex",
    gap: "8px",
  },
  zoomIcon: {
    cursor: "pointer",
    width: `${variables.width_24}`,
    height: `${variables.height_24}`,
  },
  zoomSlider: {
    flex: 1,
  },
  percentageText: {
    fontSize: `${variables.fontSizeSmall}`,
  },
};
