export const gradientYellow = {
	background: 'linear-gradient(90deg, #25759A, $black200)',

	'&:before': {
		borderRadius: 4,
		content: '',
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		maskImage: 'linear-gradient(to bottom, transparent, black)',
		background: 'linear-gradient(90deg, $black200, #8C872A)',
	},
}
export const gradientPink = {
	background: 'linear-gradient(90deg, #E88AE2, $black200)',
	'&:before': {
		borderRadius: 4,
		content: '',
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		maskImage: 'linear-gradient(to bottom, transparent, black)',
		background: 'linear-gradient(90deg, $black200, #15932E)',
	},
}

export const HEADER_LINKS = {
	ethereum: 'https://ethereum.org/',
	documentation: 'https://docs.hyperverse.dev/',
	github: 'https://github.com/decentology/hyperverse-mono',
	decentology: 'https://decentology.com/',
	twitter: 'https://twitter.com/hyperverse_dao',
	discord: 'https://discord.gg/hyperversedao',
}

export const Modules = {
	erc721: 'erc721',
	erc20: 'erc20',
	erc777: 'erc777',
	randomPick: 'randomPick',

	whitelist: 'whitelist',
	stakeRewards: 'stakeRewards',
	tribes: 'tribes',
} as const

export type Modules = typeof Modules[keyof typeof Modules]

type ModuleTypes = {
	name: string
	description: string
	to?: string
	storybook?: string
	sample?: string
	npm?: string
	args?: {
		[key: string]: string | number
	}
	codeSnippets?: { [key: string]: string }[]
}

export const ModulesInfo: { [key in Modules]: ModuleTypes } = {
	[Modules.erc721]: {
		name: 'ERC721',
		description: 'Create and own your own ERC721 Contract. This can be used for collection NFTs or 1:1 NFTs.',
		to: '/modules/erc721',
		storybook: 'https://samples.hyperverse.dev/erc721-storybook/',
		sample: 'https://samples.hyperverse.dev/erc721-app/',
		npm: 'https://www.npmjs.com/package/@decentology/hyperverse-evm-erc721',
		args: {
			token: 'Token Name',
			symbol: 'Token Symbol',
		},
		codeSnippets: [
			{
				name: 'mint',
				type: 'mutate',
				snippet: `mint({address: string , amount?: number})`,
			},
			{
				name: 'transfer',
				type: 'mutate',
				snippet: `transfer({from: string , to: string, tokenId: number})`,
			},
			{
				name: 'approve',
				type: 'mutate',
				snippet: `approve({to: string, tokenId: number})`,
			},
			{
				name: 'setApprovalForAll',
				type: 'mutate',
				snippet: `setApprovalForAll({operator: string, approved: boolean})`,
			},
			{
				name: 'getBaseURI',
				type: 'read',
				snippet: `getBaseURI()`,
			},
			{
				name: 'tokenURI',
				type: 'read',
				snippet: `tokenURI(tokenId)`,
			},
			{
				name: 'getBalanceOf',
				type: 'read',
				snippet: `getBalanceOf(address)`,
			},
			{
				name: 'getOwnerOf',
				type: 'read',
				snippet: `getOwnerOf(tokenId)`,
			},
		],
	},
	[Modules.erc20]: {
		name: 'ERC20',
		description: 'Deploy your own ERC20 fungible token to use for currency, voting rights, staking, and more.',
		to: '/modules/erc20',
		npm: 'https://www.npmjs.com/package/@decentology/hyperverse-evm-erc20',

		args: {
			token: 'Token Name',
			symbol: 'Token Symbol',
			decimals: 'Token Decimals',
		},
		codeSnippets: [
			{
				name: 'mint',
				type: 'mutate',
				snippet: `mint({amount?: number})`,
			},
			{
				name: 'burn',
				type: 'mutate',
				snippet: `burn({amount?: number})`,
			},
			{
				name: 'transfer',
				type: 'mutate',
				snippet: `transfer({ to: string, amount: number})`,
			},
			{
				name: 'transferFrom',
				type: 'mutate',
				snippet: `transfer({ from:string, to: string, amount: number})`,
			},
			{
				name: 'approve',
				type: 'mutate',
				snippet: `approve({spender: string, amount: number})`,
			},
			{
				name: 'allowance',
				type: 'read',
				snippet: `setApprovalForAll({owner: string, spender: string})`,
			},
			{
				name: 'getTotalSupply',
				type: 'read',
				snippet: `getTotalSupply()`,
			},
			{
				name: 'getBalanceOf',
				type: 'read',
				snippet: `getBalanceOf(address: string)`,
			},
			{
				name: 'getBalance',
				type: 'read',
				snippet: `getBalance()`,
			},
			{
				name: 'getTokenName',
				type: 'read',
				snippet: `getTokenName()`,
			},
			{
				name: 'getTokenSymbol',
				type: 'read',
				snippet: `getTokenSymbol()`,
			},
		],
	},
	[Modules.randomPick]: {
		name: 'Random Pick',
		description: 'Access Chainlink VRF to select a random winner, roll a die, or generate a random number.',
		npm: 'https://www.npmjs.com/package/@decentology/hyperverse-ethereum-randompick',
		// to: '/modules/randomPick',
	},

	[Modules.whitelist]: {
		name: 'Whitelist',
		description: 'Manage addresses by whitelisting users that can be later checked and verified',
		npm: 'https://www.npmjs.com/package/@decentology/hyperverse-evm-whitelist',
		// to: '/modules/whitelist',
	},
	[Modules.erc777]: {
		name: 'ERC777',
		description: 'Improve your fungible tokens with an improved user experience and additional functionalities.',
		npm: 'https://www.npmjs.com/package/@decentology/hyperverse-evm-erc777',

		// to: '/modules/erc777',
	},
	[Modules.stakeRewards]: {
		name: 'Stake Rewards',
		description: 'Allow staking for users to earn rewards and receive additional benefits for their contribution.',
		npm: 'https://www.npmjs.com/package/@decentology/hyperverse-evm-stake-rewards'
		// to: '/modules/stakeRewards',
	},
	[Modules.tribes]: {
		name: 'Tribes',
		description: 'Build communities for your favorite teams, animals, anime characters, hobbies, or interests.',
		npm: 'https://www.npmjs.com/package/@decentology/hyperverse-evm-tribes',
		// to: '/modules/tribes',
	},
}
