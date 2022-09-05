const fs = require('fs-extra');
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
let GOLD_LIST = JSON.parse(fs.readFileSync('./whitelist/gold-wallets.json', 'utf8')).map((address) => address.address.toLowerCase());
let WHITE_LIST = JSON.parse(fs.readFileSync('./whitelist/all-eligible-wallets.json', 'utf8')).map((address) => address.address.toLowerCase());

GOLD_LIST = GOLD_LIST.map((address) => keccak256(address));
WHITE_LIST = WHITE_LIST.map((address) => keccak256(address));
fs.writeFileSync('./whitelist/gold-wallets.hashed.json', JSON.stringify(GOLD_LIST));
fs.writeFileSync('./whitelist/all-eligible-wallets.hashed.json', JSON.stringify(WHITE_LIST));

console.log('GOLDLIST', generateMerkleRoot(GOLD_LIST))
console.log('WHITELIST', generateMerkleRoot(WHITE_LIST))

let GOLD_LIST_HASH = JSON.parse(fs.readFileSync('./whitelist/gold-wallets.hashed.json', 'utf8')).map(x => new Uint8Array(x.data.map(y => parseInt(y))));
let WHITE_LIST_HASH = JSON.parse(fs.readFileSync('./whitelist/all-eligible-wallets.hashed.json', 'utf8')).map(x => new Uint8Array(x.data.map(y => parseInt(y))));

console.log('GOLDLIST.HASH', generateMerkleRoot(GOLD_LIST_HASH))
console.log('WHITELIST.HASH', generateMerkleRoot(WHITE_LIST_HASH))

function generateMerkleRoot(list) {
	const merkleTree = new MerkleTree(list, keccak256, { sortPairs: true });
	return '0x' + merkleTree.getRoot().toString('hex');
}
