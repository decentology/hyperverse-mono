import React from 'react';
import { styled } from '../stitches.config';
import { Button } from './basics/Button';
import { InfoHeading } from './basics/InfoHeading';
import { InputContainer, Label, StyledInput } from './basics/Input';

export const CreateInstance = () => {
	return (
		<Container>
			<InfoHeading heading="Create Instance" variant="subHeading" />
			<Inputs>
				<InputContainer>
					<Label>Collection Name</Label>
					<StyledInput placeholder="Collection Name" />
				</InputContainer>
        <InputContainer>
					<Label>Collection Symbol</Label>
					<StyledInput placeholder="Collection Symbol" />
				</InputContainer>
			</Inputs>
			<ButtonContainer>
				<Button label="Create Instance" />
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
