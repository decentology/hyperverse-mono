import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useFlow } from '@decentology/hyperverse-flow';

const shortenHash = (hash: string = '', charLength: number = 6, postCharLength?: number) => {
	let shortendHash;
	if (postCharLength) {
		shortendHash =
			hash.slice(0, charLength) +
			'...' +
			hash.slice(hash.length - postCharLength, hash.length);
	} else {
		shortendHash = hash.slice(0, charLength);
	}
	return shortendHash;
};

const Nav = () => {
	let flow = useFlow();

	return (
		<nav>
			<Link href="/" passHref>
				<a className={styles.logo}>T</a>
			</Link>
			<div className={styles.rightNav}>
				<Link href="https://docs-hyperhack.decentology.com/learn-with-examples" passHref>
					<a target="_blank" rel="noreferrer">
						About
					</a>
				</Link>

				{flow?.user?.loggedIn && flow?.user?.addr ? (
					<button className={styles.logout} onClick={() => flow?.unauthenticate()}>
						<span>{shortenHash(flow.user.addr, 5, 5)}</span>
					</button>
				) : (
					<button className={styles.connect} onClick={() => flow?.authenticate()}>
						Connect Wallet
					</button>
				)}
			</div>
		</nav>
	);
};

export default Nav;
