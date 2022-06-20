import Head from 'next/head';
import { styled } from '../../stitches.config';
import { Nav } from '../components/basics/Nav';
import { Modules } from '../components/Modules';
import { Playground } from '../components/Playground';
export default function Home() {
	return (
		<>
			<Head>
				<title>Hyperverse 🚀</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
			<Nav />
				<Modules/>
			</main>
		</>
	);
}

