import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Nav from '../components/Nav';
import Loader from '../components/Loader';
import { useTribes } from '@decentology/hyperverse-evm-tribes';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Link from 'next/link';
import { useMutation, useQuery } from 'react-query';

const AllTribes = () => {
	const router = useRouter();
	// const { account } = useEthereum();
	const tribes = useTribes();
	const { data, isLoading: allTribesLoading } = useQuery('tribes', () => tribes.getAllTribes!(), {
		enabled: !tribes.loading,
	});
	const {
		mutate,
		isLoading: joinTribeLoading,
		error,
		isSuccess,
	} = useMutation('joinTribe', tribes.joinTribe);
	
	useEffect(() => {
		if (isSuccess) {
			router.push('/my-tribe');
		}
	}, [isSuccess, router]);

	const isLoading = tribes.loading || allTribesLoading || joinTribeLoading;

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
				<Loader loaderMessage="processing..." />
				) : (
					<div className={styles.container}>
					<h1>Tribes</h1>
					{
					// account ? (
						!data || data.length === 0 ? (
							<>
								<h5>There are currently no existing tribes.</h5>
								<Link href="/">Go back home</Link>
							</>
						) : (
							<>
								<h5>Select Your Tribe</h5>
								<div className={styles.allTribes}>
									{data.map((item) => (
										<div key={item.id} onClick={() => mutate(item.id)}>
											<Image
												width={200}
												height={250}
												className={styles.cards}
												src={item.imageUrl}
												alt={item.name}
											/>
										</div>
									))}
								</div>
							</>
						)
					// ) 
					// : (
					// 	<p className={styles.error}>Please connect your wallet to join a tribe.</p>
					// )
					}
				</div>
			)}
		</main>
	);
};

export default AllTribes;
