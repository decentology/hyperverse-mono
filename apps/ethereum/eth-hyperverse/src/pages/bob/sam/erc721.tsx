import Head from 'next/head';
import { Playground } from '../../../components/Playground';
import { Nav } from '../../../components/Playground/Nav';


export default function Module() {
	return (
		<>

			<main>
			<Nav />
			<Playground />

				{/* <Modules/> */}
			</main>
		</>
	);
}

