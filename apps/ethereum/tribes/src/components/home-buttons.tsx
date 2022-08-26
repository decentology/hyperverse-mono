import styles from '../styles/Home.module.css';
import { useTribes } from '@decentology/hyperverse-evm-tribes/react';
import { useEthereum } from '@decentology/hyperverse-ethereum/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function HomeButtons() {
	const router = useRouter();
	const { account: address } = useEthereum();
	const { getTribeId } = useTribes();
	const [tribeId, setTribeId] = useState<number | null>();
	useEffect(() => {
		if (getTribeId && address) {
			getTribeId(address).then(setTribeId);
		}
	}, [getTribeId, address]);
	return address ? (
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
			<button className={styles.join} onClick={() => router.push('/my-tribe')}>
				View Your Tribe
			</button>
		)
	) : null;
}
