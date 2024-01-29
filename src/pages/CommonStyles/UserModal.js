import variables from "../../themes/base/styles/variables";
import { colorPallets } from "../../constant/colors";

const style = {
  container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: variables.paddingSmall,
    alignItems: "center",
    backgroundColor: variables.bodyBg,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: variables.paddingSmall,
    alignItems: "center",
  },
  header: {
    fontSize: variables.fontSizeXlargeMedium,
    marginBottom: variables.marginLarge,
    textAlign: "center",
  },
  input: {
    height: variables.height_40,
    borderColor: colorPallets.ltGrey1,
    borderWidth: 1,
    marginBottom: variables.margin_12,
    paddingLeft: variables.paddingExtraSmall,
  },
  button: {
    backgroundColor: colorPallets.blue4,
    padding: variables.paddingMediumSmall,
    borderRadius: variables.radiusSm,
    alignItems: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: variables.fullHeight,
    width: variables.fullWidth,
  },
};

export default style;
