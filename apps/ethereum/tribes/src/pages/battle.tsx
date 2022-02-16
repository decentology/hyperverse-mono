import { useRandomPick } from '@decentology/hyperverse-ethereum-randompick';
import { useTribes } from '@decentology/hyperverse-ethereum-tribes';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import Nav from '../components/Nav';
import styles from '../styles/Home.module.css';
const Battle = () => {
	const [contestants, setContestants] = useState<any[]>([]);
	const [winner, setWinner] = useState<any>(null);
	const { Tribes } = useTribes();
	const { data: tribesList } = Tribes();
	const { StartRandomPick, GetRandomPick } = useRandomPick();
	const { mutate: randomMutate, data: requestId, isLoading: randomNumber } = StartRandomPick();
	let { data: randomNumberPick, isLoading: loadingWinner } = GetRandomPick(requestId);
	const startBattle = useCallback(() => {
		randomMutate([1, 2]);
	}, [randomMutate]);

	// Pick 2 Random Tribes once we have the tribes list
	useEffect(() => {
		if (contestants.length === 0 && tribesList != null) {
			// Shuffle Array
			const shuffleTribes = tribesList.sort((a, b) => 0.5 - Math.random());
			// Pick 2 Tribes
			const randomTribes = shuffleTribes.slice(0, 2);
			console.log(randomTribes);
			setContestants(randomTribes);
		}
	}, [contestants.length, tribesList]);

	useEffect(() => {
		if (randomNumberPick && randomNumberPick != 0) {
			console.log('winner', randomNumberPick);
			setWinner(contestants[randomNumberPick - 1]);
		}
	}, [randomNumberPick, setWinner, contestants]);

	const isLoading = randomNumber || loadingWinner;

	return (
		<main>
			<Nav />
			<div className={styles.hero}>
				<div className={styles.header}>Tribes Battle Royal</div>
				{!isLoading ? <button onClick={() => startBattle()}>Start Battle</button> : null}
				{contestants.length > 0 && (
					<div className={styles.battleStage}>
						<div className={winner === contestants[0] ? styles.winner : null}>
							<Image
								src={contestants[0].imageUrl}
								width={256}
								height={256}
								alt="Tribe 1"
							/>
						</div>
						{isLoading && (
							<div
								style={{ alignSelf: 'center', color: 'red' }}
								className={styles.blink_me}
							>
								X
							</div>
						)}
						<div className={winner === contestants[1] ? styles.winner : null}>
							<Image
								src={contestants[1].imageUrl}
								width={256}
								height={256}
								alt="Tribe 2"
							/>
						</div>
					</div>
				)}
			</div>
		</main>
	);
};
export default Battle;
