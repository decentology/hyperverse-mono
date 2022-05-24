import * as PropTypes from 'prop-types';
import { useStakeRewards } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetEarned = ({ ...props }) => {
	const stakeRewards = useStakeRewards();
	const { address } = useEvm();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (stakeRewards.getEarned) {
			stakeRewards.getEarned().then(setData);
		}
	}, [stakeRewards.getEarned]);

	const hasEarnedTokens = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>There are no earned token.</p>
		);
	};

	return <div className="earnedTokens"> Earned Tokens: {hasEarnedTokens()}</div>;
};

GetEarned.propTypes = {};

GetEarned.defaultProps = {};
