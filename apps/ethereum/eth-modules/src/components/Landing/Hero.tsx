import { styled } from '../../../stitches.config';
import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { LINKS } from '../../consts';

export function Hero() {
	return (
		<HeroContainer>
			<Image src="/images/Hyperverse.png" alt="Hyperverse" width={350} height={66} />
			<SubHeader>Think npm for smart contracts</SubHeader>
			<Info>
				Explore and interact with smart modules on <br /> the Hyperverse playground.{' '}
			</Info>
			<SubContainer>
				<Link href="/playground" passHref>
					<Button
						whileHover={{
							scale: 1.1,
							transition: { duration: 0.1 },
						}}
					>
						Playground
					</Button>
				</Link>
				<Link href={LINKS.Docs} passHref>
					<Button
						target="_blank"
						rel="noreferrer"
						whileHover={{
							scale: 1.1,
							transition: { duration: 0.1 },
						}}
					>
						Documentation
					</Button>
				</Link>
			</SubContainer>
		</HeroContainer>
	);
}

const HeroContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: 200,
	textAlign: 'center',
});

const SubHeader = styled('h2', {
	fontSize: 32,
	fontWeight: 600,
	backgroundImage:
		'linear-gradient(269.85deg, #FC8AF4 16.78%, #EDC51A 65.37%, #2C789E 101.59%, #119329 148.55%)',
	backgroundClip: 'text',
	color: 'transparent',
	margin: '10px auto 30px',
});

const Info = styled('p', {
	fontSize: 20,
	lineHeight: '20px',
});

const SubContainer = styled('div', {
	display: 'flex',
	flexDirection: 'row',
	margin: '50px auto',
});

const Button = styled(motion.a, {
  textDecoration: 'none',
	border: 'none',
	padding: '10px 18px',
	background: 'linear-gradient(93deg, #8CC760 0%, #3898FF 100%)',
	boxShadow: '2px 4px 12px rgba(140, 199, 96, 0.3)',
	borderRadius: '14px',
	color: '$white100',
	fontSize: 16,
	letterSpacing: '0.2px',
	margin: 'auto 18px',
	cursor: 'pointer',
});
