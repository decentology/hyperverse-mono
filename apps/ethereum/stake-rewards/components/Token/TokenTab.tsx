import { styled } from '../../stitches.config';
import CreateTokenInstance from './WriteFunctions/CreateTokenInstance';
import Transfer from './WriteFunctions/Transfer';
import ReadComponent from '../ReadComponent';
import BalanceOf from './ReadFunctions/BalanceOf';
import Allowance from './ReadFunctions/Allowance';
import TransferFrom from './WriteFunctions/TransferFrom';
import Approve from './WriteFunctions/Approve';
import Mint from './WriteFunctions/Mint';
import GetProxyToken from './ReadFunctions/GetProxyToken';
import { useToken } from '@decentology/hyperverse-ethereum-token';
import {BsExclamationTriangleFill} from 'react-icons/bs';

const TokenTab = () => {
	const { TokenName, TokenSymbol, Balance, TotalSupply } = useToken();

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
		<>
			<Reminder><BsExclamationTriangleFill/>If you want to use the Token Instances from the once you created in the Stake Rewards Tabs, make sure to change the tenantID in _app.tsx 
				<br />to the account you used to create the instance</Reminder>
			<h3>Token Factory Functions</h3>
			<Section>
				<CreateTokenInstance />
				<GetProxyToken/>
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
						module={'(Token Module)'}
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
		</>
	);
};

export default TokenTab;

const Section = styled('div', {
	marginTop: '1rem',
	display: 'grid',
	gridTemplateColumns: '270px 270px 270px 257px',
	gridGap: '10px',
});

const Reminder = styled('div', {
	display: 'flex',
	alignItems: 'center',
	backgroundColor: '$blue300',
	width: '97%',
	padding: '1rem',
	marginTop: '1rem',
	fontSize: '12px',
	borderRadius: '5px',
	'& > svg': {
		color: '$yellow100',
		fontSize: '1.3rem',
		marginRight: '1rem',
	}
});
