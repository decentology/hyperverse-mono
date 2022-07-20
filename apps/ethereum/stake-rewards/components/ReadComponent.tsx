import { styled } from '../stitches.config';
import { useEthereum } from '@decentology/hyperverse-ethereum/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Module } from './ComponentStyles';
import { useQuery } from 'react-query';

const shortenHash = (hash: string = '', charLength: number = 6, postCharLength?: number) => {
	let shortendHash;
	if (postCharLength) {
		shortendHash =
			hash.slice(0, charLength) +
			'...' +
			hash.slice(hash.length - postCharLength, hash.length);
	} else {
		shortendHash = hash.slice(0, charLength);
	}
	return shortendHash;
};

type Props = {
	checkInstance?: boolean;
	hook: any;
	header: string;
	description: string;
	buttonText: string;
	isAddress?: boolean;
	module?: string;
};
const ReadComponent = ({
	checkInstance,
	hook,
	header,
	description,
	buttonText,
	isAddress,
	module,
}: Props) => {
	const { account } = useEthereum();
	const [hidden, setHidden] = useState(false);
	const { data, error, isLoading } = useQuery(header, hook);

	const dataFetched = isAddress ? shortenHash(data as any, 5, 5) : data as string;

	useEffect(() => {
		if (error) {
			if (error instanceof Error) {
				toast.error(error.message, {
					position: toast.POSITION.BOTTOM_CENTER,
				});
			}
		}
	}, [error]);

	return (
		<Box>
			<h4>{header}</h4>
			<p>{description}</p>
			<Button disabled={!account || !checkInstance} onClick={() => setHidden((p) => !p)}>
				{!account
					? 'Connect Wallet'
					: !checkInstance
					? 'Create an Instance'
					: !hidden
					? buttonText
					: dataFetched}
			</Button>
			<Module>{module}</Module>
		</Box>
	);
};

export default ReadComponent;

const Box = styled('div', {
	maxHeight: '150px',
	maxWidth: '220px',
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: '$blue500',
	borderRadius: '10px',
	color: 'white',
	padding: '30px 20px',
	alignItems: 'center',
	textAlign: 'center',
	'& h4': {
		marginTop: '10px',
		fontSize: '1.2rem',
		fontWeight: '500',
	},
	'& p': {
		margin: '10px 0 30px',
		fontSize: '0.8rem',
	},
});

const Button = styled('button', {
	minWidth: '150px',
	backgroundColor: '$yellow100',
	outline: 'none',
	border: 'none',
	padding: '10px 15px',
	borderRadius: '90px',
	cursor: 'pointer',
	margin: '10px auto 0',
	'&:hover': {
		opacity: 0.8,
	},
});

const Link = styled('a', {
	textDecoration: 'none',
	zIndex: '1',
});
