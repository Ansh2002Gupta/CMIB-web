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
  white2: "0f0f0f",

  shadowBlack: "#616c820a",
};

const variables = {
  // Background colors
  bodyBg: colorPallets.white1,
  primaryBg: colorPallets.blue1,
  textPrimary: colorPallets.white1,
  blueBg: colorPallets.lightBlue1,
  lightBlueBg: colorPallets.lightBlue2,
  headerBg: colorPallets.whiteSmoke,
  sidemenuBgColor: "var(--primaryBg)",
  greenBtnBg: colorPallets.green1,
  mobileBg1: colorPallets.white,
  uploadBg: colorPallets.white2,

  // Text-colors
  textDefault: colorPallets.blue2,
  textLight: colorPallets.blue3,
  textBold: colorPallets.black1,
  border: colorPallets.ltGrey2,
  hoverBorder: `1px solid ${colorPallets.primaryBg}`,
  headingColor: colorPallets.black1,
  subHeadingColor: colorPallets.darkGrey1,
  btnText: colorPallets.white,
  successText: colorPallets.green1,
  disableLink: colorPallets.mediumGrey,
  active: colorPallets.green2,
  active2: colorPallets.green1,
  linkColor: colorPallets.darkBlue,
  disableBtn: colorPallets.mediumGrey,
  checkBoxText: colorPallets.black1,
  error: colorPallets.red1,
  requiredStarColor: colorPallets.red1,

  // Border-Radius
  radiusXss: "2px",
  radiusSm: "4px",
  radiusMd: "6px",
  radiusLg: "8px",
  radiusXLg: "12px",
  radiusXLgMedium: "16px",
  radiusXXLg: "24px",

  // Font-size
  fontSizeExtraSmall: "12px",
  fontSizeSmall: "14px",
  fontSizeNormal: "16px",
  fontSizeLarge: "18px",
  fontSizeXlarge: "20px",
  fontSizeXlargeMedium: "24px",
  fontSizeXXlarge: "28px",
  fontSizeHeading: "32px",
  fontSizeLargeHeading: "36px",
  fontSizeExtraLargeHeading: "40px",

  // Font-height
  lineHeightExtraSmall: "16px",
  lineHeightSmall: "18px",
  lineHeightNormal: "20px",
  lineHeightLarge: "22px",
  lineHeightXlarge: "24px",
  lineHeightXXlarge: "32px",
  lineHeightHeading: "40px",
  lineHeightLargeHeading: "44px",
  lineHeightExtraLargeHeading: "48px",

  // Font-weights
  fontWeightSmall: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,

  // Widths
  sidemenuWidth: "74px",

  // Heights
  btnHeight: "56px",
  minBtnHeight: "45px",

  // Borders
  borderLight: `1px solid ${colorPallets.ltGrey1}`,
  borderColor: colorPallets.ltGrey1,

  // Box shadow
  boxShadow: `1px 1px 10px #e9ebf1`,
  boxShadowBottom: `0 3px 3px -1px #e9ebf1`,
  boxShadowColor: colorPallets.shadowBlack,

  // Font-family
  fontFamilyRegular: "General Sans",

  // Z-index
  maxZIndex: 99,

  // Input
  inputLabel: colorPallets.black1,
  inputText: colorPallets.black1,
  inputPlaceHolder: colorPallets.darkGrey1,

  // Padding
  paddingExtraSmall: "8px",
  paddingSmall: "16px",
  paddingMedium: "24px",
  paddingLarge: "32px",
  paddingXLarge: "40px",
  paddingXXLarge: "48px",
  paddingForSection: "72px",

  // Bullet points
  bulletPoint: colorPallets.ltGrey1,
  bulletPointText: colorPallets.darkGrey2,

  // Gap
  gapXXLarge: "56px",
  gapXLarge: "40px",
  gapLarge: "32px",
  gapMedium: "24px",
  gapSmall: "16px",
  gapSmallMedium: "12px",
  gapXSmall: "8px",
  gapXXSmall: "4px",

  // margin
  marginMedium: "16px",
};

export default variables;
