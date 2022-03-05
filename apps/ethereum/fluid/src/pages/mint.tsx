import type { NextPage } from 'next';

import PageLayout from '../layouts/PageLayout';
import MintView from '../views/MintView';

const Mint: NextPage = () => {
	return (
		<PageLayout>
			<MintView />
		</PageLayout>
	);
};

export default Mint;
