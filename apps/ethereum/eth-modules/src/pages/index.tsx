import Head from 'next/head';
import { styled } from '../../stitches.config';
import Image from 'next/image';
import Link from 'next/link';
import { Hero } from '../components/Landing/Hero';
import { LINKS } from '../consts';

export default function Home() {
	return (
		<>
			<Head>
				<title>Hyperverse 🚀</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Nav>
				<Link href={LINKS.Decentology} passHref>
				<a target="_blank" rel="noreferrer">
					<Image src="/images/Decentology.png" alt='Decentology'  width={175} height={36}/>
					</a>
				</Link>
				</Nav>
				<Hero />
			</main>
		</>
	);
}


const Nav = styled('nav', {
	display: 'flex',
})