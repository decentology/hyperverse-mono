import * as PropTypes from 'prop-types';
import { useERC20 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
const { BigNumber } = require('ethers');

export const Burn = ({ ...props }) => {
	// let unitMultiple = new BigNumber.from(10).pow(new BigNumber.from(3));
	// let alice;
	// let aliceProxyContract;

	// const { Burn } = useERC20();
	// const { address } = useEvm();
	// const amount = new BigNumber.from(500).mul(unitMultiple);
	// const burnAmount = aliceProxyContract.connect(alice).burn(amount);

	return (
		<div className="burn">
			Tokens Burned: <b>{}</b>
		</div>
	);
};

Burn.propTypes = {};

Burn.defaultProps = {};
