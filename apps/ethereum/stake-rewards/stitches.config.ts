import { createStitches } from '@stitches/react';

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } =
	createStitches({
		theme: {
			colors: {
				white100: '#ADADB8',
				gray100: '#BEBEC7',
				gray200: '#5A5A6B',
				gray400: 'gainsboro',
				gray600: '#3D3D4F',
				gray500: 'lightgray',
				blue200: '#3EB2ED',
				blue300: 'rgba(87, 105, 170, 0.8)',
				blue500: '#000020',
				green200: '#2C8D3D',
				green300: '#195E25',
				yellow100: '#EDC51A',
			},
		},
		media: {
			bp1: '(min-width: 480px)',
		},
		utils: {
			marginX: (value: any) => ({ marginLeft: value, marginRight: value }),
		},
	});
