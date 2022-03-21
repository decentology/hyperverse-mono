const { BigNumber } = require('ethers');

const provider = () => hre.waffle.provider;
const toBN = (value) => BigNumber.from(value);

const latestBlock = () => provider().send('eth_blockNumber', []).then(toBN);

const advanceBlock = () => {
	return provider().send('evm_mine', []);
};
const advanceBlockTo = async (blockNumber) => {
	const target =
		typeof blockNumber === 'number' || typeof blockNumber === 'string'
			? toBN(blockNumber)
			: blockNumber;
	const currentBlock = await latestBlock();
	const start = Date.now();
	let notified;
	if (target.lt(currentBlock))
		throw Error(`Target block #(${target}) is lower than current block #(${currentBlock})`);
	while ((await latestBlock()).lt(target)) {
		if (!notified && Date.now() - start >= 5000) {
			notified = true;
			console.log(
				`advanceBlockTo: Advancing too ` + 'many blocks is causing this test to be slow.'
			);
		}
		await advanceBlock();
	}
};

module.exports = {
	advanceBlockTo,
	toBN,
};
