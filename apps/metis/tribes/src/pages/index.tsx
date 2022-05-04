import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Nav from '../components/Nav';
import { useTribes } from '@decentology/hyperverse-evm-tribes';
import { useMetis } from '@decentology/hyperverse-metis';

const Home: NextPage = () => {
	const router = useRouter();
	const { address } = useMetis();
	const { getTribeId } = useTribes();
	const [tribeId, setTribeId] = useState<number | null>();
	useEffect(() => {
		if (address && getTribeId) {
			getTribeId(address).then(setTribeId);
		}
	}, [getTribeId, address]);

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
						{address ? (
							!tribeId ? (
								<button
									className={styles.join}
									onClick={() => {
										router.push('/all-tribes');
									}}
								>
									Join A Tribe
								</button>
							) : (
								<button
									className={styles.join}
									onClick={() => router.push('/my-tribe')}
								>
									View Your Tribe
								</button>
							)
						) : null}
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;
