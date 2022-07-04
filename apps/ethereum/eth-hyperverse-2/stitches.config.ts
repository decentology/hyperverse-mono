import { createStitches } from '@stitches/react'

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } = createStitches({
  media: {
    mobile: '(min-width: 640px)',
    tablet: '(min-width: 768px)',
    tabletLandscape: '(min-width: 1024px)',
    laptop: '(min-width: 1160px)',
    desktop: '(min-width: 1440px)',
  },
  theme: {
    fonts: {
      body: 'Poppins, sans-serif',
      mono: 'Roboto Mono, monospace',
    },
    colors: {
      grey50: '#FFFFFF',
      grey100: '#D9D9D9',
      grey200: '#D6D6D6',
      grey300: '#D3D3D3',
      grey400: '#707070',
      black100: '#1B1A25',
      black200: '#0F0E15',
      black300: '#030202',
      blue100: '#4D9ACC',
      blue500: '#32303E',
    },
    backgroundImages: {
      gradientPink: 'url(./gradientPink.png)',
      gradientYellow: 'linear-gradient(139deg, rgba(42,94,127,1) 19%, rgba(118,112,39,1) 100%)',
    },
  },
  utils: {
    marginX: (value: number | string) => ({ marginLeft: value, marginRight: value }),
    marginY: (value: number | string) => ({ marginTop: value, marginBottom: value }),
    paddingX: (value: number | string) => ({ paddingLeft: value, paddingRight: value }),
    paddingY: (value: number | string) => ({ paddingTop: value, paddingBottom: value }),
  },
})
