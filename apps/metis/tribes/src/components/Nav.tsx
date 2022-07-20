import Link from 'next/link';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { useMetis } from '@decentology/hyperverse-metis/react';
import { toast } from 'react-toastify';

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
	const { address, Connect, error } = useMetis();

	useEffect(() => {
		if (error) {
			toast.warn(error.message, {
				position: toast.POSITION.BOTTOM_CENTER,
			});
		}
	}, [error]);
	return (
		<nav>
			<Link href="/" passHref>
				<a className={styles.logo}>T</a>
			</Link>
			<div className={styles.rightNav}>
				<Link href="https://docs.hyperverse.dev/" passHref>
					<a target="_blank" rel="noreferrer">
						About
					</a>
				</Link>

				<Connect />
			</div>
		</nav>
	);
};

export default Nav;
