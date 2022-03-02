import { styled } from '../stitches.config';
import CreateInstance from './WriteFunctions/CreateInstance';
import Transfer from './WriteFunctions/Transfer';
import ReadComponent from './ReadComponent';
import BalanceOf from './ReadFunctions/BalanceOf';
import Allowance from './ReadFunctions/Allowance';
import TransferFrom from './WriteFunctions/TransferFrom';
import Approve from './WriteFunctions/Approve';
import Mint from './WriteFunctions/Mint';
import { useERC20 } from '@decentology/hyperverse-evm-erc20';

const Container = () => {
	const { Proxy, TokenName, TokenSymbol, Balance, TotalSupply } = useERC20();

	const TokenReadFunctions = [
			{
			hook: TokenName(),
			header: 'Token Name',
			description: 'Get the Token Name',
			buttonText: 'Get Token Name',
		},
		{
			hook: TokenSymbol(),
			header: 'Token Symbol',
			description: 'Get the token symbol',
			buttonText: 'Get Token Symbol',
		},
		{
			hook: TotalSupply(),
			header: 'Total Supply',
			description: 'Total supply in circulation',
			buttonText: 'Get Total Supply',
		},
		{
			hook: Balance(),
			header: 'Balance',
			description: 'Get the balance of your account',
			buttonText: 'Get Balance',
		},
	];

	return (
		<Box>
			<h3>Token Factory Functions</h3>
			<Section>
				<CreateInstance />
				<ReadComponent
					hook={Proxy()}
					header="Get Proxy"
					description="Get your proxy contract address"
					buttonText={'Get Instance'}
					isAddress={true}
				/>
			</Section>

			<h3>Token Functions</h3>
			<Section>
				{TokenReadFunctions.map((item) => (
					<ReadComponent
						key={item.header}
						hook={item.hook}
						header={item.header}
						description={item.description}
						buttonText={item.buttonText}
					/>
				))}
				<BalanceOf />
				<Transfer />
				<TransferFrom />
				<Approve />
				<Allowance />
			</Section>

			<h3>Tenant Owner Functions</h3>
			<Section>
				<Mint />
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
