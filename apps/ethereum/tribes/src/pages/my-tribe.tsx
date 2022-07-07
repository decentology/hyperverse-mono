import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { useEffect } from 'react';
import { useEthereum } from '@decentology/hyperverse-ethereum/react';
import { useTribes } from '@decentology/hyperverse-evm-tribes/react';
import styles from '../styles/Home.module.css';
import Nav from '../components/Nav';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import Image from 'next/image';

const TribesPage = () => {
	const router = useRouter();
	const { account } = useEthereum();
	const tribes = useTribes();
	const {
		data,
		isLoading: tribeDataLoading,
		error: tribeErr,
	} = useQuery('tribeAccount', () => tribes.getTribeByAccount!(account!), {
		enabled: !tribes.loading,
	});

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
			<button className={styles.join} onClick={() => mutate()}>Leave</button>
			{isLoading ? (
				<Loader loaderMessage="Processing..." />
			) : account && !tribeErr && data ? (
				<div className={styles.container2}>
					<div className={styles.container3}>
						{data.image === 'N/A' ? (
							<div className={styles.tribeCard}>
								<h2>{data.name}</h2>
							</div>
						) : (
							<img
								width={300}
								height={380}
								src={`${data.imageUrl}`}
								alt={data.name}
								className={styles.tribe}
							/>
						)}

						<div className={styles.text}>
							<h1>{data.name}</h1>
							<p className={styles.description}>{data.description}</p>
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
