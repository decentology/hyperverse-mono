import { useRandomPick } from '@decentology/hyperverse-ethereum-randompick';
import { useTribes } from '@decentology/hyperverse-ethereum-tribes';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import Nav from '../components/Nav';
import styles from '../styles/Home.module.css';

const Battle = () => {
	const [fightImages] = useState<string[]>(['BANH.png', 'BOOM.png', 'STARS.png', 'POW.png']);
	const { width, height } = useWindowSize();
	const [contestants, setContestants] = useState<any[]>([]);
	const [randomFightImage, setRandomFightImage] = useState<string>(fightImages[0]);
	const [winner, setWinner] = useState<any>(null);
	const { Tribes } = useTribes();
	const { data: tribesList } = Tribes();
	const { StartRandomPick, GetRandomPick } = useRandomPick();
	const { mutate: randomMutate, data: requestId, isLoading: randomNumber } = StartRandomPick();
	let { data: randomNumberPick, isLoading: loadingWinner } = GetRandomPick(requestId);
	const startBattle = useCallback(() => {
		setWinner(null);
		randomMutate([1, 2]);
	}, [randomMutate]);

	// Pick 2 Random Tribes once we have the tribes list
	useEffect(() => {
		if (contestants.length === 0 && tribesList != null) {
			// Shuffle Array
			const shuffleTribes = tribesList.sort((a, b) => 0.5 - Math.random());
			// Pick 2 Tribes
			const randomTribes = shuffleTribes.slice(0, 2);
			setContestants(randomTribes);
		}
	}, [contestants.length, tribesList]);

	useEffect(() => {
		if (randomNumberPick && randomNumberPick != 0) {
			setWinner(contestants[randomNumberPick - 1]);
		}
	}, [randomNumberPick, setWinner, contestants]);

	const isLoading = randomNumber || loadingWinner;

	// Update fight image every 2 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			const randomFightImageIndex = Math.floor(Math.random() * fightImages.length);
			setRandomFightImage(fightImages[randomFightImageIndex]);
		}, 2000);
		return () => clearInterval(interval);
	}, [fightImages, setRandomFightImage]);

	return (
		<main>
			{winner && <Confetti width={width} height={height} />}
			<Nav />
			<div className={styles.battleRoyal}>
				<h1 className={styles.header}>Tribes Battle Royale</h1>
				{!isLoading ? (
					<button className={styles.battleBtn} onClick={() => startBattle()}>
						Start Battle
					</button>
				) : null}
				{contestants.length > 0 && (
					<div className={styles.battleStage}>
						<div
							className={
								winner
									? winner === contestants[0]
										? styles.winner
										: styles.loser
									: null
							}
						>
							<Image
								src={contestants[0].imageUrl}
								width={270}
								height={350}
								alt="Tribe 1"
							/>
						</div>
						<div className={styles.container4}>
							{isLoading ? (
								<Image
									src={`/${randomFightImage}`}
									className={styles.blink_me}
									width={170}
									height={170}
									alt="Loading"
								/>
							) : !winner ? (
								<Image src="/VS.png" width={170} height={170} alt="vs" />
							) : null}
						</div>
						<div
							className={
								winner
									? winner === contestants[1]
										? styles.winner
										: styles.loser
									: null
							}
						>
							<Image
								src={contestants[1].imageUrl}
								width={270}
								height={350}
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
