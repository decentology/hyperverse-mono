import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Nav from '../components/Nav';
import dynamic from 'next/dynamic';
const HomeButtons = dynamic(() => import('../components/home-buttons'), { ssr: false });

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Tribes Sample Project</title>
				<meta
					name="description"
					content="Sample project utilizing tribes module from hyperverse"
				/>
			</Head>

			<main>
				<Nav />
				<div className={styles.hero}>
					<div className={styles.header}>
						<h1> Tribes</h1>
						<p className={styles.about}>
							An example dapp utilizing the tribes module built on the hyperverse.
							Tribes allows you to build communities that people can join, leave, or
							create.
						</p>
						<HomeButtons />
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;
