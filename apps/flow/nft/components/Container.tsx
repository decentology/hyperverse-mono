import { styled } from '../stitches.config';
import CreateInstance from './WriteFunctions/CreateInstance';
import MintNFT from './WriteFunctions/MintNFT';
import Transfer from './WriteFunctions/Transfer';
import ReadComponent from './ReadComponent';
import BalanceOf from './BalanceOf';
import { useNFT } from '@decentology/hyperverse-flow-nft';
import { useFlow } from '@decentology/hyperverse-flow';

const Container = () => {
	const flow = useFlow();
	const nft = useNFT();

	const TokenReadFunctions = [
		{
			hook: nft.getTotalSupply,
			header: 'Get Total Supply',
			description: 'Get the total supply of NFTs',
			buttonText: 'Get Total Supply'
		},
		{
			hook: nft.getBalance,
			header: 'Get Balance',
			description: 'Get the balance of your account',
			buttonText: 'Get Balance'
		}
	];

	return (
		<Box>
			<h3>NFT Tenant Functions</h3>
			<Section>
				<CreateInstance />
			</Section>

			<h3>Token Functions</h3>
			<Section>
				{TokenReadFunctions.map((item) => (
					<ReadComponent
						key={item.header}
						isAddress={!!flow.user?.addr}
						hook={item.hook}
						header={item.header}
						description={item.description}
						buttonText={item.buttonText}
					/>
				))}
				<BalanceOf />
				<MintNFT />
				<Transfer />

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
	},
});

const Section = styled('div', {
	marginTop: '1rem',
	display: 'grid',
	gridTemplateColumns: '270px 270px 270px 257px',
	gridGap: '10px',
});
