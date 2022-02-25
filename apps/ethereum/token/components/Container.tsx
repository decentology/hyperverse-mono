import { styled } from '../stitches.config';
import CreateInstance from './functions/CreateInstance';
import GetProxy from './functions/GetProxy';
import TotalSupply from './functions/TotalSupply';
import Transfer from './functions/Transfer';

const Container = () => {
	return (
		<Box>
			<h3>Token Tenant Functions</h3>
			<Section>
				<CreateInstance />
        <GetProxy/>
			</Section>

      <h3>Token Functions</h3>
			<Section>
				<TotalSupply />
        <Transfer/>
			</Section>
		</Box>
	);
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
  }
});

const Section = styled('div', {
  marginTop: '1rem',
  display: 'grid',
  gridTemplateColumns: '270px 270px 257px',
  gridGap: '10px',
  
});
