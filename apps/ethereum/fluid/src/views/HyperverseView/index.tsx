import Head from 'next/head';
import { styled } from '../../../stitches.config';
import Nav from '../../hyperverseComponents/Nav';
import Container from '../../hyperverseComponents/Container';

export default function HyperverseView() {
	return (
		<>
			<Head>
				<title>Hyperverse 🚀</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Main>
				<Nav />
				<h1>Hyperverse Token Package</h1>
				<Container />
			</Main>
		</>
	);
}

const Main = styled('main', {
	padding: '2rem',
	display: 'flex',
	flexDirection: 'column',
	margin: 'auto',
	backgroundColor: '$blue500',
	color: '$gray100',
	minHeight: '100vh',
	justifyContent: 'center',
	'& h1': {
		marginTop: '2rem',
		fontWeight: 'lighter',
		fontSize: '1.5rem',
	},
});
