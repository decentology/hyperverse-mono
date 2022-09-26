import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';
import { create } from '@storybook/theming';
import logo from '../.assets/SafuuX-Token_Black-BG-a5d22aaf.svg';

const theme = create({
	base: 'light',
	brandTitle: 'Hyperverse-safuux',
	brandUrl: 'https://www.safuux.com/',
	brandImage: logo,
});

addons.setConfig({
	theme,
});
