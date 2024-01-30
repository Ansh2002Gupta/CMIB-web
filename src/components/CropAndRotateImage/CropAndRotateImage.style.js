import { colorPallets } from "../../constant/colors";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  cropperContainer: {
    position: "relative",
    overflowY: "auto",
    padding: "16 24",
    borderTop: `1px solid rgba(0, 0, 0, 0.12)`,
    borderBottom: `1px solid rgba(0, 0, 0, 0.12)`,
    backgroundColor: colorPallets.ltGrey1,
    height: "max(20vh, 400px)",
    borderRadius: 16,
  },
  actionBtnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
    marginTop: 32,
  },
};

export default styles;
