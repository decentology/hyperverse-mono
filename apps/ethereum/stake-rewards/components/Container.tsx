import { styled } from '../stitches.config';
import { useStakeRewards } from '@decentology/hyperverse-ethereum-stake-rewards';
import CreateInstance from './WriteFunctions/CreateTokenInstance';
import CreateStakeInstance from './WriteFunctions/CreateStakeInstance';
import ReadComponent from './ReadComponent';
import BalanceOf from './ReadFunctions/BalanceOf';
import Stake from './WriteFunctions/Stake';
import Withdraw from './WriteFunctions/Withdraw';
import Earned from './ReadFunctions/Earned';
import GetReward from './WriteFunctions/GetReward';
import GetProxyToken from './ReadFunctions/GetProxyToken';

const Container = () => {
	const { Proxy, TotalSupply, Balance, RewardPerToken ,TokenContract, RewardTokenContract } = useStakeRewards();
	const StakeReadFunctions = [
		{
			hook: TotalSupply(),
			header: 'Total Supply',
			description: 'Get the Total Supply of Stake Tokens that is currently staked',
			buttonText: 'Get Total Supply',
		},
		{
			hook: Balance(),
			header: 'Balance',
			description: 'Get the stake token balance of your account',
			buttonText: 'Get Balance',
		},
		{
			hook: RewardPerToken(),
			header: 'Reward Per Token',
			description: 'Get the current reward rate per token staked',
			buttonText: 'Get Rate',
		},
		{
			hook: TokenContract(),
			header: 'Stake Token Contract',
			description: 'Get the stake token contract',
			buttonText: 'Get Contarct',
			isAddress: true,
		},
		{
			hook: RewardTokenContract(),
			header: 'Reward Token Contract',
			description: 'Get the reward token contract',
			buttonText: 'Get Contarct',
			isAddress: true,
		},
	];



	return (
		<Box>
			<Info>To test the Stake Rewards Module, you will need the contract address of 2 ERC20 Tokens.
			The Stake Token  <br />  can be an existing ERC20 that is on the Rinkeby Chain but the Stake Token must be your own.</Info>
			<h3>Token Factory Functions</h3>
			<Section>
				<CreateInstance />
				<GetProxyToken />
			</Section>

			<h3>Stake Rewards Factory Functions</h3>
			<Section>
				<CreateStakeInstance />
				<ReadComponent
					hook={Proxy()}
					header="Get Proxy"
					description="Get your proxy contract address"
					buttonText={'Get Instance'}
					isAddress={true}
				/>
			
			</Section>


			<h3>Stake Rewards Functions</h3>
			<Section>
				{StakeReadFunctions.map((item) => (
					<ReadComponent
						key={item.header}
						hook={item.hook}
						header={item.header}
						description={item.description}
						buttonText={item.buttonText}
						isAddress={item.isAddress}
					/>
				))}
				<BalanceOf />
				<Earned/>
				<Stake />
				<Withdraw />
				<GetReward />
			</Section>
\
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

const Info = styled('div', {
	marginTop: '2rem',
	color: '$gray200',
})