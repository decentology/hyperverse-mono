import Head from 'next/head';
import { styled } from '../../stitches.config';
import { Nav } from '../components/Playground/Nav';
import { Modules } from '../components/Modules';
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

