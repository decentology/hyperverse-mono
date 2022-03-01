import { styled } from '../../stitches.config';
import { useStakeRewards } from '@decentology/hyperverse-ethereum-stake-rewards';
import CreateStakeInstance from './WriteFunctions/CreateStakeInstance';
import ReadComponent from '../ReadComponent';
import BalanceOf from './ReadFunctions/BalanceOf';
import Stake from './WriteFunctions/Stake';
import Withdraw from './WriteFunctions/Withdraw';
import Earned from './ReadFunctions/Earned';
import GetReward from './WriteFunctions/GetReward';
import * as Accordion from '@radix-ui/react-accordion';
import { BsExclamationCircleFill } from 'react-icons/bs';
import Approve from '../Token/WriteFunctions/Approve';

const StakeRewardsTab = () => {
	const {
		Proxy,
		TotalSupply,
		Balance,
		RewardPerToken,
		TokenContract,
		RewardTokenContract,
	} = useStakeRewards();
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
			buttonText: 'Get Contract',
			isAddress: true,
		},
		{
			hook: RewardTokenContract(),
			header: 'Reward Token Contract',
			description: 'Get the reward token contract',
			buttonText: 'Get Contract',
			isAddress: true,
		},
	];

	return (
		<>
			<Accordion.Root type="single" collapsible>
				<Accordion.Item value="item-1">
					<Header>
						<Trigger>
              <BsExclamationCircleFill />
              How to use the Stake Rewards Module
              </Trigger>
					</Header>
					<Content>
						<Info>
							To test the Stake Rewards Module, you will need the contract address of
							2 ERC20 Tokens. The Stake Token can be an existing ERC20 that is
              <br />on the Rinkeby Chain but the Reward Token must be your own.
							<br />
              <br />
							1. Create a Stake Token Instance using the Token Module. Save the contract address on the side.
              <br />
              2. On a separate account create a Reward Token Instance using the Token Module. Save the contract address on the side.
              <br />
              3. Create a new instance of Stake Rewards Module, using the two contract addresses you obtained from Step 1 and 2 <br/>
              and a reward rate of your choosing.
              <br />
              4. Make sure you pass in the address of the account you used to create the Stake Rewards Instance in _app.tsx.
							<br />
							5. To allow people to withdraw their rewards, you need to transfer tokens from your token proxy to your stake rewards proxy.
   
						</Info>
					</Content>
				</Accordion.Item>
			</Accordion.Root>

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
				<Approve/>
			</Section>
			<h3>Stake Rewards Functions</h3>
			<Section>
        <Stake />
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
				<Earned />
				<Withdraw />
				<GetReward />
			</Section>
		</>
	);
};

export default StakeRewardsTab;

const Section = styled('div', {
	marginTop: '1rem',
	display: 'grid',
	gridTemplateColumns: '270px 270px 270px 257px',
	gridGap: '10px',
});

const Info = styled('div', {
	color: '$blue500',
  fontSize: '12px'
});

const  Trigger = styled(Accordion.Trigger, {
  display: 'flex',
  alignItems: 'center',
  outline: 'none',
  border: 'none',
  background: 'none',
  color: 'white',
  cursor: 'pointer',
  fontSize: '14px',
  '& > svg' : {
    marginRight: '10px',
    fontSize: '1.2rem',
    color: '$yellow100'
  },
})

const Header = styled(Accordion.Header, {
  backgroundColor: '$blue300',
  padding: '1rem',
})

const Content = styled(Accordion.Content, {
  backgroundColor: '$blue300',
  padding: '0 1rem 1rem',
})