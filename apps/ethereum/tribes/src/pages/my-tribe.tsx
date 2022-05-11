import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { useEffect } from 'react';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useTribes } from '@decentology/hyperverse-evm-tribes';
import styles from '../styles/Home.module.css';
import Nav from '../components/Nav';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import Image from 'next/image';
import {TRIBES} from '../components/Tribes';

const TribesPage = () => {
	const router = useRouter();
	const { address: account } = useEthereum();
	const tribes = useTribes();
	// const {
	// 	data,
	// 	isLoading: tribeDataLoading,
	// 	error: tribeErr,
	// } = useQuery('tribeAccount', () => tribes.getTribeByAccount!(account!), {
	// 	enabled: !tribes.loading,
	// });

	const {data, 		isLoading: tribeDataLoading,
		error: tribeErr,} = useQuery('tribeId', () => tribes.getTribeId!(account!), {
		enabled: !tribes.loading,
	});

	const tribeData = TRIBES.find(tribe => tribe.id === data);


	const {
		mutate,
		isLoading: leaveTribeLoading,
		error: leaveErr,
	} = useMutation('leaveTribe', tribes.leaveTribe, {
		onSuccess: () => {
			router.push('/');
		},
	});

	const isLoading = tribeDataLoading || leaveTribeLoading;

	const error = tribeErr || leaveErr;
	useEffect(() => {
		if (error) {
			if (error instanceof Error) {
				toast.error(error.message, {
					position: toast.POSITION.BOTTOM_CENTER,
				});
			}
		}
	}, [error]);
	return (
		<main>
			<Nav />
			{isLoading ? (
				<Loader loaderMessage="Processing..." />
			) : account && !tribeErr && tribeData ? (
				<div className={styles.container2}>
					<div className={styles.container3}>
						{tribeData.image === 'N/A' ? (
							<div className={styles.tribeCard}>
								<h2>{tribeData.name}</h2>
							</div>
						) : (
							<Image
								width={300}
								height={380}
								src={`${tribeData.image}`}
								alt={tribeData.name}
								className={styles.tribe}
							/>
						)}

						<div className={styles.text}>
							<h1>{tribeData.name}</h1>
							<p className={styles.description}>{tribeData.description}</p>
						</div>
					</div>
					<button className={styles.join} onClick={() => mutate()}>
						Leave Tribe
					</button>
				</div>
			) : (
				account &&
				!tribeErr && (
					<div className={styles.container2}>
						<button className={styles.join} onClick={() => router.push('/all-tribes')}>
							Join a Tribe
						</button>
					</div>
				)
			)}

			{!account && (
				<div className={styles.container2}>
					<p className={styles.error}>Connect Wallet to view your tribe</p>
				</div>
			)}
		</main>
	);
};

export default TribesPage;
