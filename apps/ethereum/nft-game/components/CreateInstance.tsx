import React from 'react';
import { styled } from '../stitches.config';
import { Button } from './basics/Button';
import { InfoHeading } from './basics/InfoHeading';
import { InputContainer, Label, StyledInput } from './basics/Input';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useNFTGame } from '@decentology/hyperverse-evm-nft-game';
import { useMutation, useQuery } from 'react-query';

export const CreateInstance = () => {
	const { account } = useEthereum();
	const NFTGame = useNFTGame();

	const { data: instance } = useQuery('instance', () => NFTGame.checkInstance!(account), {
		enabled: !!NFTGame.factoryContract,
	});

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
		<Container>
			<InfoHeading heading="Create Instance" variant="subHeading" />
			<Inputs>
				<InputContainer>
					<Label>Collection Name</Label>
					<StyledInput placeholder="Collection Name" onChange={(e) => setTokenName(e.target.value)} />
				</InputContainer>
				<InputContainer>
					<Label>Collection Symbol</Label>
					<StyledInput placeholder="Collection Symbol" onChange={(e) => setTokenSymbol(e.target.value)} />
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
		</Container>
	);
};

const Container = styled('div', {
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	background: '$black200',
	borderRadius: 4,
	border: '1px solid $blue500',
	padding: '16px 18px',
});

const Inputs = styled('div', {
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

const ButtonContainer = styled('div', {
	display: 'flex',
	width: '100%',
	justifyContent: 'flex-end',
});
