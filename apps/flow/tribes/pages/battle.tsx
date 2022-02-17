import { useRandomPick } from '@decentology/hyperverse-flow-randompick';
import { TribesData, useTribes } from '@decentology/hyperverse-flow-tribes';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import Confetti from 'react-confetti'
import Nav from '../components/Nav';
import useWindowSize from 'react-use/lib/useWindowSize';
import styles from '../styles/Home.module.css';

const Battle = () => {
	const { width, height } = useWindowSize()
	const [contestants, setContestants] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [winner, setWinner] = useState<any>(null);
	const tribes = useTribes();
	const [allTribes, setAllTribes] = useState<TribesData[]>([]);
	const RandomPick = useRandomPick();

	const startBattle = async () => {
		setWinner(null);
		let winner = await RandomPick.getRandomPick([1, 2]);
		console.log(winner);
		setWinner(contestants[winner - 1]);
	};

	// Pick 2 Random Tribes once we have the tribes list
	useEffect(() => {
		if (contestants.length === 0 && allTribes != null) {
			// Shuffle Array
			const shuffleTribes = allTribes.sort((a, b) => 0.5 - Math.random());
			// Pick 2 Tribes
			const randomTribes = shuffleTribes.slice(0, 2);
			setContestants(randomTribes);
		}
	}, [contestants.length, allTribes]);

	const getTheTribes = useCallback(async () => {
		setIsLoading(true);
		setAllTribes((await tribes?.getAllTribes()) || []);
		setIsLoading(false);
	}, [setAllTribes, setIsLoading, tribes]);

	useEffect(() => {
		getTheTribes();
	}, [getTheTribes]);

	return (
		<main>

			{winner && (<Confetti width={width} height={height} />)}
			<Nav />
			<div className={styles.battleRoyal}>
				<h1 className={styles.header}>Tribes Battle Royale</h1>
				{!isLoading ? <button className={styles.battleBtn} onClick={() => startBattle()}>Start Battle</button> : null}
				{contestants.length > 0 && (
					<div className={styles.battleStage}>
						<div className={winner ? winner === contestants[0] ? styles.winner : styles.loser : null}>
							<Image
								src={`https://ipfs.infura.io/ipfs/${contestants[0].ipfsHash}/`}
								width={256}
								height={300}
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
						<div className={winner ? winner === contestants[1] ? styles.winner : styles.loser : null}>
							<Image
								src={`https://ipfs.infura.io/ipfs/${contestants[1].ipfsHash}/`}
								width={256}
								height={300}
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
