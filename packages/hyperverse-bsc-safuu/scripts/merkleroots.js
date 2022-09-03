const fs = require('fs-extra');
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const GOLD_LIST = JSON.parse(fs.readFileSync('./whitelist/gold-wallets.json', 'utf8'));
const WHITE_LIST = JSON.parse(fs.readFileSync('./whitelist/all-eligible-wallets.json', 'utf8'));

console.log('GOLDLIST', generateMerkleRoot(GOLD_LIST))
console.log('WHITELIST', generateMerkleRoot(WHITE_LIST))


function generateMerkleRoot(signers) {
	const leafNodes = signers.map((signer) => keccak256(signer.address.toLowerCase()));
	const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
	return '0x' + merkleTree.getRoot().toString('hex');
}
