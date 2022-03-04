import type { NextPage } from 'next';

import MainView from '../views//MainView';
import PageLayout from '../layouts/PageLayout';

const Home: NextPage = () => (
	<>
		<PageLayout>
			<MainView />
		</PageLayout>
	</>
);

export default Home;
