import * as PropTypes from 'prop-types';
import { useStakeRewards } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const ClaimReward = ({ ...props }) => {
	const { claimReward } = useStakeRewards();
	const { address, Connect } = useEvm();

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				claimReward({});
			}}
		>
			Claim Token Rewards
		</button>
	) : (
		<Connect />
	);
};

ClaimReward.propTypes = {};

ClaimReward.defaultProps = {};
