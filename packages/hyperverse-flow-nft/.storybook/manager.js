import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';
import { create } from '@storybook/theming';

const theme = create({
	base: 'light',
	brandTitle: 'Hyperverse-Flow-NFT',
	brandUrl: 'https://www.decentology.com',
	brandImage: 'https://drive.google.com/uc?export=view&id=1gi_Ni_r1xQqrLRVlVVfXVvEEj-THLrq1',
});

addons.setConfig({
	theme,
});
