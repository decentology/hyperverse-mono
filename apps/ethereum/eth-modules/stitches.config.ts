import { createStitches } from '@stitches/react'

export const { styled, getCssText, globalCss, createTheme } = createStitches({
  media: {
    mobile: '(min-width: 640px)',
    tablet: '(min-width: 768px)',
    laptop: '(min-width: 1024px)',
    desktop: '(min-width: 1280px)',
    desktopLg: '(min-width: 1600px)',
  },
  theme: {
    fonts: {
      system: 'system-ui',
      mainFont: 'Montserrat, sans-serif',
      mono: 'Roboto Mono, monospace',
    },
    colors: {
      black100: '#030202',
      blue100: '#15112B',
      white100: '#fafafa',
    },
    backgroundImage: {
      greenBlue: 'linear-gradient(93.31deg, #8CC760 19.89%, rgba(56, 152, 255, 0.99) 109.23%)',
    },
    fontWeights: {
      regular: 300,
      medium: 400,
      bold: 500,
      extraBold: 600,
    },
    fontSizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
    },
  },
})

