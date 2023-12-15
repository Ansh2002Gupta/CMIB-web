const colorPallets = {
  blue1: "#60C5F9",
  blue2: "#0a3292",
  blue3: "#8997c5",
  lightBlue1: "#F6F8F9",
  lightBlue2: "#f2f4fc",
  darkBlue: "#00137E",

  red1: "#D93400",

  ltGrey1: "#ccd0e5",
  ltGrey2: "#cecece36",

  mediumGrey: "#B1B3B5",

  darkGrey1: "#616C82",
  darkGrey2: "#5a5a5a",

  black1: "#000833",

  green1: "#04AF55",
  green2: "#00873E",

  white: "#FBFCFF",
  white1: "#ffffff",

  shadowBlack: "#616c820a",
};

const variables = {
  bodyBg: colorPallets.white1,
  primaryBg: colorPallets.blue1,
  textPrimary: colorPallets.white1,
  blueBg: colorPallets.lightBlue1,
  lightBlueBg: colorPallets.lightBlue2,

  textDefault: colorPallets.blue2,
  textLight: colorPallets.blue3,

  textBold: colorPallets.black1,

  border: colorPallets.ltGrey2,
  hoverBorder: `1px solid ${colorPallets.primaryBg}`,

  radiusXss: "2px",
  radiusSm: "4px",
  radiusMd: "6px",
  radiusLg: "8px",

  fontSizeExtraSmall: "12px",
  lineHeightExtraSmall: "16px",

  fontSizeSmall: "14px",
  lineHeightSmall: "18px",

  fontSizeNormal: "16px",
  lineHeightNormal: "20px",

  fontSizeLarge: "18px",
  lineHeightLarge: "22px",

  fontSizeXlarge: "20px",
  lineHeightXlarge: "24px",

  fontSizeHeading: "32px",
  lineHeightHeading: "40px",

  fontWeightSmall: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,

  sidemenuWidth: "74px",

  borderLight: `1px solid ${colorPallets.ltGrey1}`,
  borderColor: colorPallets.ltGrey1,

  boxShadow: `1px 1px 10px #e9ebf1`,
  boxShadowBottom: `0 3px 3px -1px #e9ebf1`,

  fontFamilyRegular: "General Sans",

  error: colorPallets.red1,
  requiredStarColor: colorPallets.red1,

  maxZIndex: 99,

  headerBg: "#f5f5f5",
  sidemenuBgColor: "var(--primaryBg)",
  greenBtnBg: colorPallets.green1,

  headingColor: colorPallets.black1,
  subHeadingColor: colorPallets.darkGrey1,
  btnText: colorPallets.white,

  inputLabel: colorPallets.black1,
  inputText: colorPallets.black1,
  inputPlaceHolder: colorPallets.darkGrey1,

  linkColor: colorPallets.darkBlue,

  followUsTextColor: colorPallets.darkGrey1,

  boxShadowColor: colorPallets.shadowBlack,

  disableBtn: colorPallets.mediumGrey,
  btnHeight: "56px",

  mobileBg1: colorPallets.white,

  checkBoxText: colorPallets.black1,

  paddingSmall: "16px",
  paddingMedium: "24px",
  paddingLarge: "32px",

  bulletPoint: colorPallets.ltGrey1,
  bulletPointText: colorPallets.darkGrey2,

  active: colorPallets.green2,
  active2: colorPallets.green1,

  successText: colorPallets.green1,

  disableLink: colorPallets.mediumGrey,
};

export default variables;
