import { colorPallets } from "../../../constant/colors";

const variables = {
  // Background colors
  bodyBg: colorPallets.white1,
  bodyBg2: colorPallets.white2,
  primaryBg: colorPallets.blue1,
  textPrimary: colorPallets.white1,
  blueBg: colorPallets.lightBlue1,
  lightBlueBg: colorPallets.lightBlue2,
  headerBg: colorPallets.whiteSmoke,
  sidemenuBgColor: "var(--primaryBg)",
  greenBtnBg: colorPallets.green1,
  frogGreen: colorPallets.frogGreen,
  mobileBg1: colorPallets.white,
  uploadBg: colorPallets.white1,
  snow: colorPallets.snow,
  lightGreen: colorPallets.lightGreen,
  greyBlue: colorPallets.greyBlue,
  blackBg: colorPallets.black1,
  lightGreenBg: colorPallets.lightGreen,
  lightBlueBg2: colorPallets.snow,
  lightRedBg: colorPallets.lightOrange,
  orangeBg: colorPallets.orange1,
  blueBg2: colorPallets.blue4,
  greenBg: colorPallets.green3,
  greyBg: colorPallets.ltGrey1,
  yellowBg: colorPallets.yellow1,
  chipBg: colorPallets.lightBlue2,
  sideMenuBg1: colorPallets.blue8,
  lightGrey3Bg: colorPallets.ltGrey3,
  darkBlueBg: colorPallets.darkBlue4,
  ltGrey4: colorPallets.ltGrey4,
  darkBlueBg1: colorPallets.blue9,
  lightGrey: colorPallets.lightGrey,
  disableColor: colorPallets.disableColor,
  ltGreyBg: colorPallets.ltGreyBg,
  inactiveWhite: colorPallets.inactiveWhite,

  // Text-colors
  textDefault: colorPallets.black,
  textLight: colorPallets.blue3,
  textBold: colorPallets.black1,
  textDark: colorPallets.black1,
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
  sideMenuMaskBg: colorPallets.maskBlack,
  greyText: colorPallets.ltGrey1,
  orangeText: colorPallets.orange2,
  blueText: colorPallets.blue7,
  greenText: colorPallets.green4,
  redText: colorPallets.red1,
  lightGreyText3: colorPallets.ltGrey4,
  ltGrey7: colorPallets.ltGrey7,
  darkBlue3: colorPallets.darkBlue3,
  ltGrey5: colorPallets.ltGrey5,
  whiteText: colorPallets.white,
  darkBlue2: colorPallets.darkBlue2,
  skyBlue: colorPallets.skyBlue,

  // Border-Radius
  radiusNone: "0px",
  radiusXss: "2px",
  radiusSm: "4px",
  radiusMd: "6px",
  radiusLg: "8px",
  radiusXLg: "12px",
  radiusMLg: "16px",
  radius_18: "18px",
  radiusXXLg: "24px",
  radius_48: "48px",
  radius_50Per: "50%",

  // Font-size
  fontSizeExtraSmall: "12px",
  fontSizeSmall: "14px",
  fontSizeSmallMedium: "15px",
  fontSizeNormal: "16px",
  fontSizeLarge: "18px",
  fontSizeXlarge: "20px",
  fontSizeXlargeSmall: "22px",
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
  width_1: "1px",
  width_3: "3px",
  width_8: "8px",
  width_10: "10px",
  xSmallWidth: "16px",
  width_20: "20px",
  width_24: "24px",
  width_30: "30px",
  width_32: "32px",
  width_40: "40px",
  width_42: "42px",
  width_48: "48px",
  width_50: "50px",
  width_64: "64px",
  width_70: "70px",
  sidemenuWidth: "74px",
  width_80: "80px",
  width_90: "90px",
  width_100: "100px",
  width_110: "110px",
  width_104: "104px",
  width_120: "120px",
  width_125: "125px",
  width_130: "130px",
  width_140: "140px",
  width_150: "150px",
  width_160: "160px",
  width_166: "166px",
  width_170: "170px",
  width_176: "176px",
  width_180: "180px",
  width_200: "200px",
  width_250: "250px",
  width_230: "230px",
  width_300: "300px",
  width_347: "347px",
  width_350: "350px",
  width_363: "363px",
  width_400: "400px",
  width_432: "432px",
  width_500: "500px",
  widthViewPort_16: "16vw",
  widthViewPort_15: "15vw",
  widthViewPort_30: "30vw",
  widthViewPort_35: "35vw",
  widthHalfViewPort: "50vw",
  widthViewPort_65: "65vw",
  widthFullViewPort: "100vw",
  width_30Per: "30%",
  width_45Per: "45%",
  halfWidth: "50%",
  width70Per: "70%",
  width90Per: "90%",
  fullWidth: "100%",

  // Heights
  height_1: "1px",
  height_5: "5px",
  xSmallHeight: "16px",
  height_20: "20px",
  height_24: "24px",
  height_30: "30px",
  height_32: "32px",
  height_36: "36px",
  height_40: "40px",
  height_44: "44px",
  minBtnHeight: "45px",
  height_46: "46px",
  height_48: "48px",
  height_50: "50px",
  height_55: "55px",
  height_64: "64px",
  btnHeight: "56px",
  height_68: "68px",
  height_70: "70px",
  height_80: "80px",
  height_90: "90px",
  height_100: "100px",
  height_104: "104px",
  height_120: "120px",
  height_150: "150px",
  height_200: "200px",
  height_184: "184px",
  height_210: "210px",
  height_240: "240px",
  height_250: "250px",
  height_280: "280px",
  height_300: "300px",
  height_350: "350px",
  height_400: "400px",
  height_600: "600px",
  height_700: "700px",
  height_25vh: "25vh",
  height_30vh: "30vh",
  height_35vh: "35vh",
  height_40vh: "40vh",
  height_45vh: "45vh",
  height_50vh: "50vh",
  height_60vh: "60vh",
  height_65vh: "65vh",
  height_70vh: "70vh",
  height_85vh: "85vh",
  heightFullViewPort: "100vh",
  halfHeight: "50%",
  fullHeight: "100%",

  // Distance for top, left, bottom and right
  distance_85: "85px",
  top_10: "10px",

  // Borders
  borderLight: `1px solid ${colorPallets.ltGrey1}`,
  borderLight2: `1px solid ${colorPallets.ltGrey2}`,
  borderBlue: `2px solid ${colorPallets.darkBlue}`,
  borderBlue1: `1px solid ${colorPallets.darkBlue}`,
  borderGreen: `1px solid ${colorPallets.green1}`,
  borderError: `1px solid ${colorPallets.red1}`,
  borderColor: colorPallets.ltGrey1,

  // Box shadow
  boxShadow: `1px 1px 10px #e9ebf1`,
  boxShadowBottom: `0 3px 3px -1px #e9ebf1`,
  boxShadowColor: colorPallets.shadowBlack,
  boxShadowOne: `inset 0 0 6px rgba(0, 0, 0, 0)`,

  // Font-family
  fontFamilyRegular: "General Sans",

  // Z-index
  maxZIndex: 99,

  // Input
  inputLabel: colorPallets.black1,
  inputText: colorPallets.black1,
  inputPlaceHolder: colorPallets.darkGrey1,

  // Padding
  paddingNone: "0px",
  paddingXXXSmall: "2px",
  paddingXXSmall: "4px",
  paddingExtraSmall: "8px",
  padding_9: "9px",
  padding_5: "5px",
  paddingMediumSmall: "12px",
  padding_14: "14px",
  paddingSmall: "16px",
  padding_18: "18px",
  padding_20: "20px",
  padding_22: "22px",
  paddingMedium: "24px",
  padding_30: "30px",
  paddingLarge: "32px",
  paddingXLarge: "40px",
  paddingXXLarge: "48px",
  padding_60: "60px",
  paddingForSection: "72px",

  // Bullet points
  bulletPoint: colorPallets.ltGrey1,
  bulletPointText: colorPallets.darkGrey2,

  // Gap
  gapXXSmall: "4px",
  gapXSmall: "8px",
  gapSmallMedium: "12px",
  gapSmall: "16px",
  gap_18: "18px",
  gap_20: "20px",
  gapMedium: "24px",
  gap_26: "26px",
  gap_28: "28px",
  gapLarge: "32px",
  gapXLarge: "40px",
  gapXXLarge: "56px",
  gap_80: "80px",

  // margin
  margin_2: "2px",
  marginSmall: "8px",
  marginXSmall: "6px",
  marginXXSmall: "4px",
  margin_10: "10px",
  margin_12: "12px",
  margin_14: "14px",
  marginMedium: "16px",
  margin_20: "20px",
  marginLarge: "24px",
  margin_32: "32px",
  margin_40: "40px",
  margin_60: "60px",

  profileBoxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
};
export default variables;
