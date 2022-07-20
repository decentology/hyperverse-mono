import Head from 'next/head';
import Nav from '../components/Nav';
import Container from '../components/Container';

export default function Home() {
	return (
		<>
			<Head>
				<title>Hyperverse 🚀</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Nav />
				<h1>Hyperverse ERC20 Package</h1>
				<Container />
			</main>
		</>
	);
}

