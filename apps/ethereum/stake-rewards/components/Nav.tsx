import Link from 'next/link';
import { useEffect } from 'react';
import { useEthereum } from '@decentology/hyperverse-ethereum/react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { styled } from '../stitches.config';


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
			<NavItems>
				<Link href="https://docs.hyperverse.dev/" passHref>
					<About target="_blank" rel="noreferrer">
						About
					</About>
				</Link>

				<Connect accountStatus={'full'} />
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
});

const NavItems = styled('div', {
	display: 'flex',
	alignItems: 'center',

});

const About = styled('a', {
	color: 'white',
	textDecoration: 'none',
	marginRight: 20,
	'&:hover': {
		opacity: 0.8,
	},
});

