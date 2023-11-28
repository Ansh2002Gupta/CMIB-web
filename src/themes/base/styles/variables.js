const colorPallets = {
  blue1: '#60C5F9',
  blue2: '#0a3292',
  blue3: '#8997c5',
  
  red1: '#ef6a6a',
  
  white1: '#ffffff',

  ltGrey1: '#ecf1fb',
  ltGrey2: '#cecece36',
}

const variables = {
  bodyBg: colorPallets.white1,
  primaryBg: colorPallets.blue1,
  textPrimary: colorPallets.white1,

  textDefault: colorPallets.blue2,
  textLight: colorPallets.blue3,

  border: colorPallets.ltGrey2,
  hoverBorder: `1px solid ${colorPallets.primaryBg}`,

  radiusXss: '2px',
  radiusSm: '4px',
  radiusMd: '6px',
  radiusLg: '8px',
  
  fontSizeSmall: '14px',
  lineHeightSmall: '18px',

  fontSizeNormal: '16px',
  lineHeightNormal: '20px',

  fontSizeLarge: '18px',
  lineHeightLarge: '22px',

  fontSizeXlarge: '20px',
  lineHeightXlarge: '24px',
  
  sidemenuWidth: '74px',

  borderLight: `1px solid ${colorPallets.ltGrey1}`,

  boxShadow: `1px 1px 10px #e9ebf1`,
  boxShadowBottom: `0 3px 3px -1px #e9ebf1`,
  
  fontFamilyRegular: 'General Sans',
  
  error: colorPallets.red1,

  maxZIndex: 99,

  headerBg: '#f5f5f5',
  sidemenuBgColor: 'var(--primaryBg)',
}

export default variables;
