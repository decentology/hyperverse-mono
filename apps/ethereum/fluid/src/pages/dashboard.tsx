import type { NextPage } from 'next';

import PageLayout from '../layouts/PageLayout';

const Dashboard: NextPage = () => {
	return (
		<>
			<PageLayout>
				<h1 className="text-7xl font-bold">Dashboard</h1>

				<p>
					This page will have a link to Superfluid dashboard or actually show how much
					money has been streamed.
				</p>
			</PageLayout>
		</>
	);
};

export default Dashboard;
