import variables from "../../themes/base/styles/variables";

const styles = {
  zoomInfoContainer: {
    marginTop: `${variables.margin_32}`,
    flexDirection: "row",
    gap: `${variables.gapSmall}`,
    alignItems: "center",
  },
  sliderBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: `${variables.gapXSmall}`,
    flex: 1,
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

export default styles;
