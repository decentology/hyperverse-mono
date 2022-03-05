import type { NextPage } from 'next';
import { globalCss } from '../../stitches.config';
import TopBar from '../layouts/TopBar';

import HyperverseView from '../views/HyperverseView';

const globalStyles = globalCss({
	'*': {
		margin: 0,
		padding: 0,
	},
	html: {
		fontSize: 14,
		fontFamily: 'Proxima Nova, sans-serif',
		letterSpacing: '0.9px',
	},
	body: {
		fontSize: '1rem',
		margin: '30px auto',
		backgroundColor: '$blue500',
		color: '$gray100',
	},
});

const Mint: NextPage = () => {
	globalStyles();
	return (
		<>
			<TopBar />
			<HyperverseView />
		</>
	);
};

export default Mint;
