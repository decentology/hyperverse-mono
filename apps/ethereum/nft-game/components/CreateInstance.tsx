import React from 'react';
import { styled } from '../stitches.config';
import { Button } from './basics/Button';
import { InfoHeading } from './basics/InfoHeading';
import { InputContainer, Label, StyledInput } from './basics/Input';
import { useEthereum } from '@decentology/hyperverse-ethereum/react';
import { useNFTGame } from '@decentology/hyperverse-evm-nft-game/react';
import { useMutation, useQuery } from 'react-query';
import { NavLink } from './basics/NavLink';

export const CreateInstance = () => {
	const { account } = useEthereum();
	const NFTGame = useNFTGame();

	const { data: instance } = useQuery('instance', () => NFTGame.checkInstance!(account), {
		enabled: !!NFTGame.factoryContract,
	});

	const { data: instanceAddress } = useQuery('instanceAddress', () => NFTGame.getProxy!(account), {
		enabled: !!NFTGame.factoryContract && !!instance,
	});

	console.log(instanceAddress);

	const [tokenName, setTokenName] = React.useState<string>('');
	const [tokenSymbol, setTokenSymbol] = React.useState<string>('');

	const { mutate, isLoading } = useMutation('createTokenInstance', NFTGame.createInstance);

	const createNewInstance = async () => {
		try {
			mutate({
				account: account!,
				tokenName,
				tokenSymbol,
			});
		} catch (error) {
			throw error;
		}
	};

	return (
		<Container instance={instance}>
			<InfoHeading
				heading={!instance ? 'Create Instance' : 'NFT Game Instance'}
				variant="subHeading"
			/>
			{!!instanceAddress && (
				<InfoBox>
					<InfoContainer><NavLink to={`https://rinkeby.etherscan.io/address/${instanceAddress}`} external>{instanceAddress}</NavLink></InfoContainer>
				</InfoBox>
			)}

			{!instance && (
				<>
					<Inputs>
						<InputContainer>
							<Label>Create Instance</Label>
							<StyledInput
								placeholder="Collection Name"
								onChange={(e) => setTokenName(e.target.value)}
							/>
						</InputContainer>
						<InputContainer>
							<Label>Collection Symbol</Label>
							<StyledInput
								placeholder="Collection Symbol"
								onChange={(e) => setTokenSymbol(e.target.value)}
							/>
						</InputContainer>
					</Inputs>
					<ButtonContainer>
						<Button
							label={
								!instance
									? 'Create Instance'
									: isLoading
									? 'txn loading ...'
									: 'Instance Created'
							}
							disabled={!account || instance}
							onClick={createNewInstance}
						/>
					</ButtonContainer>
				</>
			)}
		</Container>
	);
};

export const Container = styled('div', {
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	background: '$black200',
	borderRadius: 4,
	border: '1px solid $blue500',
	padding: '16px 18px',

	variants: {
		instance: {
			true :  {
				alignItems: 'center',
				flexDirection: 'row',
				columnGap: 10,
				justifyContent: 'space-between',

			}
		}
	}
});

export const Inputs = styled('div', {
	position: 'relative',
	display: 'flex',
	justifyContent: 'space-between',
	width: '100%',
	marginBottom: 12,

	div: {
		marginRight: '0.5rem',
		width: '100%',
		'&:last-child': {
			marginRight: 0,
		},
	},
});

export const ButtonContainer = styled('div', {
	display: 'flex',
	width: '100%',
	justifyContent: 'flex-end',
});

const InfoBox = styled(Inputs, {
	height: '20%',
	width: '80%',
	marginBottom: 0,
	display: 'flex',
	
	
});

const InfoContainer = styled(InputContainer, {
	background: '$black200',
	display: 'flex',
	position: 'relative',
	justifyContent: 'center',
	alignItems: 'flex-end',
	border: 'none',


});
