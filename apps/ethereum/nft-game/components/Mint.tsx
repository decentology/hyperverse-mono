import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useNFTGame } from '@decentology/hyperverse-evm-nft-game';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { styled } from '../stitches.config';
import { Button } from './basics/Button';
import { InfoHeading } from './basics/InfoHeading';
import { InputContainer, Label, StyledInput } from './basics/Input';

export const TenantMint = () => {
	const { account } = useEthereum();
	const NFTGame = useNFTGame();

	const { data: instance } = useQuery('instance', () => NFTGame.checkInstance!(account), {
		enabled: !!NFTGame.factoryContract,
	});

	const [reciever, setReciever] = React.useState<string>('');
	const [tokenName, setTokenName] = React.useState<string>('');
	const [eyeId, setEyeId] = React.useState<string>('');
	const [mouthId, setMouthId] = React.useState<string>('');
	const [bodyId, setBodyId] = React.useState<string>('');

	const { mutate, isLoading } = useMutation('tenantMint', NFTGame.tenantMint);

	const tenantMint = async () => {
		try {
			mutate({
				to: reciever,
				tokenName,
				eyeId,
				mouthId,
				bodyId,
			});
		} catch (error) {
			throw error;
		}
	};
	return (
		<Container>
			<InfoHeading heading="Tenant Mint" variant="subHeading" />
			<Inputs>
				<InputContainer>
					<Label>Receiver</Label>
					<StyledInput
						placeholder="Receiver"
						onChange={(e) => setReciever(e.target.value)}
					/>
				</InputContainer>
				<InputContainer>
					<Label>Token Name</Label>
					<StyledInput
						placeholder="Token Name"
						onChange={(e) => setTokenName(e.target.value)}
					/>
				</InputContainer>
			</Inputs>
			<Inputs>
				<InputContainer>
					<Label>Eye Id</Label>
					<StyledInput placeholder="Eye Id" onChange={(e) => setEyeId(e.target.value)} />
				</InputContainer>
				<InputContainer>
					<Label>Mouth Id</Label>
					<StyledInput
						placeholder="Mouth Id"
						onChange={(e) => setMouthId(e.target.value)}
					/>
				</InputContainer>
				<InputContainer>
					<Label>Body Id</Label>
					<StyledInput
						placeholder="Body Id"
						onChange={(e) => setBodyId(e.target.value)}
					/>
				</InputContainer>
			</Inputs>
			<ButtonContainer>
				<Button
					label={!isLoading ? 'Mint' : 'txn loadin ...'}
					disabled={!account || !instance}
					onClick={tenantMint}
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
