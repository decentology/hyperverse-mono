import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      gray100: '#BEBEC7',
      gray200: '#5A5A6B',
      gray400: 'gainsboro',
      gray500: 'lightgray',
      blue500: '#000020',
      blue200: '#3EB2ED',
      green200: '#2C8D3D',
      yellow100: '#EDC51A',
    },
  },
  media: {
    bp1: '(min-width: 480px)',
  },
  utils: {
    marginX: (value) => ({ marginLeft: value, marginRight: value }),
  },
});