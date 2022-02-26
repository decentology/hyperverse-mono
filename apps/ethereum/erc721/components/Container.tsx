import { styled } from '../stitches.config';
import CreateInstance from './WriteFunctions/CreateInstance';
import Transfer from './WriteFunctions/Transfer';
import ReadComponent from './ReadComponent';

const Container = () => {
	// const { Proxy, Balance, TotalSupply } = useToken();

	return <div></div>
};

export default Container;

const Box = styled('div', {
	display: 'flex',
	overflowY: 'scroll',
	flexDirection: 'column',
	marginTop: '1rem',
	borderRadius: '10px',
	backgroundColor: '$gray100',
	height: '70vh',
	padding: '0 2rem 2rem',
	color: '$blue500',
	'& h3': {
		marginTop: '2rem',
	},
});

const Section = styled('div', {
	marginTop: '1rem',
	display: 'grid',
	gridTemplateColumns: '270px 270px 257px',
	gridGap: '10px',
});
