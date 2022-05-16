import Link from 'next/link';
import { useEffect } from 'react';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { styled } from '../stitches.config';

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
	const { Connect, error } = useEthereum();
	useEffect(() => {
		if (error) {
			toast.warn(error.message, {
				position: toast.POSITION.BOTTOM_CENTER,
			});
		}
	}, [error]);
	return (
		<Header>
			<Link href="/" passHref>
				<a>
					<Image src="/Hyperverse.png" width={250} height={47} />
				</a>
			</Link>
			<NavItems >
				<Link href="https://docs.hyperverse.dev/" passHref>
					<About target="_blank" rel="noreferrer">
						About
					</About>
				</Link>

				<Connect accountStatus={'full'}/>
			</NavItems>
		</Header>
	);
};

export default Nav;

const Header = styled('nav', {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
})

const NavItems = styled('div', {
	display: 'flex',
	alignItems: 'center',
	'& button' : {
		margin: '0 0 0 20px',
	}
})

const About = styled('a', {
	color: 'white',
	textDecoration: 'none',
	'&:hover': {
		opacity: 0.8,
	},
})
const ConnectButton = styled('button', {
	minWidth: '130px',
	backgroundColor: '$blue200',
	outline: 'none',
	border: 'none',
	padding: '10px 15px',
	borderRadius: '90px',
	cursor: 'pointer',

	
	variants: {
		color: {
			green : {
				backgroundColor: '$green200',
				color: 'white',
				'&:hover span': {
					display: 'none',
				},
				'&:hover:before': {
					content: '"disconnect" !important',
					opacity: 0.9,
				}
			}
		}
	}
})