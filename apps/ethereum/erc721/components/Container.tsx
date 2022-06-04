import { styled } from '../stitches.config';
import CreateInstance from './WriteFunctions/CreateInstance';
import Transfer from './WriteFunctions/Transfer';
import BalanceOf from './ReadFunctions/BalanceOf';
import Approve from './WriteFunctions/Approve';
import ApproveForAll from './WriteFunctions/ApproveForAll';
import TogglePublicMint from './WriteFunctions/TogglePublicMint';

import Mint from './WriteFunctions/Mint';
import GetOwnerOf from './ReadFunctions/GetOwnerOf';
import GetProxy from './ReadFunctions/GetProxy';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { BsFillExclamationDiamondFill } from 'react-icons/bs';
import { useERC721 } from '@decentology/hyperverse-evm-erc721';
import { useQuery } from 'react-query';

const Container = () => {
	const { address } = useEthereum();
	const erc721 = useERC721();

	const { data: instance } = useQuery('instance', () => address && erc721.checkInstance!(address));

	const toastId = 'instance';
	useEffect(() => {
		if (!instance && !toast.isActive(toastId)) {
			toast.info(
				'Make sure you have an instance. If you already have one change the tenant ID in _app.tsx to test this app',
				{
					position: toast.POSITION.BOTTOM_CENTER,
					toastId: 'instance',
				}
			);
		}
	}, [instance]);

	return (
		<Box>
			<Reminder>
				<BsFillExclamationDiamondFill />
				Don&apos;t forget to change the tenantID in&nbsp;<b> pages/_app.tsx </b>&nbsp;to
				test this app.
			</Reminder>
			<h3>Token Factory Functions</h3>
			<Section>
				<CreateInstance />
				<GetProxy />
			</Section>

			<h3>Tenant Owner Functions</h3>
			<Section>

				<TogglePublicMint />
			</Section>

			<h3>Token Functions</h3>
			<Section>
			<Mint />
				<BalanceOf />
				<GetOwnerOf />
				<Transfer />
				<Approve />
				<ApproveForAll />
			</Section>

		</Box>
	);
};

export default Container;

const Box = styled('div', {
	display: 'flex',
	overflowY: 'scroll',
	overflowX: 'hidden',
	flexDirection: 'column',
	marginTop: '1rem',
	borderRadius: '10px',
	backgroundColor: '$gray100',
	height: '70vh',
	padding: '0 2rem 2rem',
	color: '$blue500',
	'& h3': {
		marginTop: '1rem',
	},
});

const Section = styled('div', {
	marginTop: '1rem',
	display: 'grid',
	gridTemplateColumns: '270px 270px 270px 257px',
	gridGap: '10px',
});

const Reminder = styled('div', {
	display: 'flex',
	alignItems: 'center',
	backgroundColor: 'rgba(243, 225, 107, 0.5)',
	width: '99%',
	padding: '0.5rem',
	marginTop: '1rem',
	color: '$blue500',
	fontSize: '12px',
	borderRadius: '5px',
	'& svg': {
		marginRight: '0.5rem',
		fontSize: '1rem',
	},
});
