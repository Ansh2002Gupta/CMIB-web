const colorPallets = {
  blue1: "#60C5F9",
  blue2: "#0a3292",
  blue3: "#8997c5",
  blue4: "#141b43",

  red1: "#ef6a6a",

  white1: "#ffffff",

  ltGrey1: "#ecf1fb",
  ltGrey2: "#cecece36",
  ltGrey3: "#616c82",

  black1: "#000833",

  green1: "#04AF55",
  black: "#000000"
};

const variables = {
  bodyBg: colorPallets.white1,
  primaryBg: colorPallets.blue1,
  textPrimary: colorPallets.white1,

  textDefault: colorPallets.black,
  textLight: colorPallets.blue3,

  textBold: colorPallets.black1,

  border: colorPallets.ltGrey2,
  hoverBorder: `1px solid ${colorPallets.primaryBg}`,

  radiusXss: "2px",
  radiusSm: "4px",
  radiusMd: "6px",
  radiusLg: "8px",

  fontSizeXSmall: "12px",

  fontSizeSmall: "14px",
  lineHeightSmall: "18px",

  fontSizeNormal: "16px",
  lineHeightNormal: "20px",

  fontSizeLarge: "18px",
  lineHeightLarge: "22px",

  fontSizeXlarge: "20px",
  lineHeightXlarge: "24px",

  fontSizeXXLarge: "22px",

  fontSizeHeading: "32px",
  lineHeightHeading: "40px",

  fontWeightSmall: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,

  sidemenuWidth: "74px",

  borderLight: `1px solid ${colorPallets.ltGrey1}`,

  boxShadow: `1px 1px 10px #e9ebf1`,
  boxShadowBottom: `0 3px 3px -1px #e9ebf1`,

  fontFamilyRegular: "General Sans",

  error: colorPallets.red1,

  maxZIndex: 99,

  headerBg: "#f5f5f5",
  sidemenuBgColor: "var(--primaryBg)",
  greenBtnBg: colorPallets.green1,
  headerText: colorPallets.black,

  paddingSmall: "14px",
  paddingXSmall: "12px",

  padding4px: "4px",

  boxShadowProfile: "0px 4px 8px rgba(0, 0, 0, 0.15)",

  profileColor: colorPallets.ltGrey3,

  marginNormal: "16px",

  sizeXXSmall: "8px",
  sizeXSmall: "12px",
  sizeSmall: "14px",
  sizeNormal: "16px",
  sizeLarge: "18px",
  sizeXLarge: "20px",
  sizeXXLarge: "22px",

  sizeXSmallInRem: "1rem",
  sizeSmallInRem: "2rem",
  sizeNormalInRem: "3rem",

  sideMenuColor: colorPallets.blue4
};

export default variables;
