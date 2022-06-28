import React from 'react';
import { styled } from '../stitches.config';
import { Button } from './basics/Button';
import { InfoHeading } from './basics/InfoHeading';
import { InputContainer, Label, StyledInput } from './basics/Input';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useNFTGame } from '@decentology/hyperverse-evm-nft-game';
import { useMutation, useQuery } from 'react-query';
import { Container, Inputs, ButtonContainer } from './CreateInstance';

export const GetAttributes = () => {
	const { account } = useEthereum();
	const NFTGame = useNFTGame();

	const { data: instance } = useQuery('instance', () => NFTGame.checkInstance!(account), {
		enabled: !!NFTGame.factoryContract,
	});

	const [tokenId, setTokenId] = React.useState<string | undefined>();

	const { data: attributes, isLoading, refetch } = useQuery(
		'attributes',
		() => NFTGame.getAttributes!(tokenId),
		{
			enabled: !!NFTGame.factoryContract,
		}
	);




	return (
		<Container css={{ width: !attributes ? '30%' : 'unset'}}>
			<InfoHeading heading="Get Attributes by Token ID" variant="subHeading" />
			<SubContainer>
				<ReadContainer>
					<Inputs>
						<InputContainer>
							<Label>Token ID</Label>
							<StyledInput
								placeholder="Token ID"
								onChange={(e) => setTokenId(e.target.value)}
							/>
						</InputContainer>
					</Inputs>
					<ButtonContainer>
						<Button
							label={
								instance
									? 'Get Attributes'
									: isLoading
									? 'loading ...'
									: 'Get Attributes'
							}
							disabled={!account || !instance}
							onClick={refetch}
						/>
					</ButtonContainer>
				</ReadContainer>

				{attributes &&
					Object.keys(attributes).map((attribute) => (
						<InfoBox key={attribute}>
							<InfoContainer>
								<Label>{attribute}</Label>
								{/* @ts-ignore */}
								<Label>{attributes[attribute]}</Label>
							</InfoContainer>
						</InfoBox>
					))}
			</SubContainer>
		</Container>
	);
};

const ReadContainer = styled('div', {
	width: '100%',
});

const SubContainer = styled('div', {
	display: 'flex',
	columnGap: 8,
});

const InfoBox = styled(Inputs, {
	height: '76px',
});

const InfoContainer = styled(InputContainer, {
	background: '$black200',
});
