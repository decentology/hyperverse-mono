import * as PropTypes from 'prop-types';
import { useERC20 } from '../source';
const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { ethers } = require('hardhat');

let unitMultiple = new BigNumber.from(10).pow(new BigNumber.from(3));
let alice;
let cara;

export const Allowance = ({ ...props }) => {
	// let ownerAccount = alice.address; // owner
	// let spenderAccount = cara.address; // spender
	// let allowanceAmount = new BigNumber.from(500).mul(unitMultiple);

	// const { Allowance } = useERC20();
	// const { data: allowance } = Allowance(ownerAccount, spenderAccount); // wants an owner and a spender

	return (
		<div className="allowance">
			Allowance: <b>{}</b>
		</div>
	);
};

Allowance.propTypes = {};

Allowance.defaultProps = {};
