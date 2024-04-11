import { colorPallets } from "../../constant/colors";

const styles = {
  mainContainer: {
    flex: 1,
  },
  quillContainer: {
    marginBottom: 24,
  },
  quillStyling: {
    backgroundColor: colorPallets.red1,
    borderRadius: 15,
  },
  toolbarStyle: {
    backgroundColor: colorPallets.ltGrey1,
  },
  labelContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    color: colorPallets.darkGrey1,
    fontSize: 12,
    fontWeight: 500,
  },
  starStyle: {
    color: colorPallets.red1,
    marginLeft: 2,
  },
  mainView: {
    borderWidth: 1,
    borderRadius: 5,
    paddingBottom: 16,
    borderColor: colorPallets.ltGrey6,
    marginTop: 4,
  },
  invalidInput: {
    borderColor: colorPallets.red1,
  },
  formatOptionStyle: {
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
  },
  formatOptionTextStyle: {
    alignSelf: "center",
    padding: 8,
    backgroundColor: colorPallets.secondaryGrey,
  },
  activeFormatOptionTextStyle: {
    alignSelf: "center",
    padding: 8,
    backgroundColor: colorPallets.black1,
    color: colorPallets.white,
  },
  headingStyle: {
    fontSize: 18,
    color: colorPallets.gray,
  },
  errorMsg: {
    color: colorPallets.errorRed,
    lineHeight: 18,
  },
};

export default styles;
