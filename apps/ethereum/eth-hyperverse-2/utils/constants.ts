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
	tribes: 'tribes',
} as const

export type Modules = typeof Modules[keyof typeof Modules]

type ModuleTypes = {
	name: string
	description: string
	to: string
  storybook?: string
  sample?: string
	args?: {
		[key: string]: string
	}
  codeSnippets?: {[key: string]: string}[]
}

export const ModulesInfo: { [key in Modules]: ModuleTypes } = {
	[Modules.erc721]: {
		name: 'ERC721',
		description: 'Create and own your own ERC721 Contract. This can be used for collection NFTs or 1:1 NFTs.',
		to: '/modules/erc721',
    storybook: 'https://samples.hyperverse.dev/erc721-storybook/',
    sample: 'https://samples.hyperverse.dev/erc721-app/',
		args: {
			token: 'Token Name',
			symbol: 'Token Symbol',
		},
    codeSnippets: [
			{
				name: 'mint',
        type: 'mutate',
				snippet : `mint({address: string , amount?: number})`

			},
      {
				name: 'transfer',
        type: 'mutate',
				snippet : `transfer({from: string , to: string, tokenId: number})`
			},
			{
				name: 'approve',
        type: 'mutate',
				snippet : `approve({to: string, tokenId: number})`
			},
			{
				name: 'setApprovalForAll',
        type: 'mutate',
				snippet : `setApprovalForAll({operator: string, approved: boolean})`
			},
			{
				name: 'getBaseURI',
        type: 'read',
				snippet : `getBaseURI()`
			},
			{
				name: 'tokenURI',
        type: 'read',
				snippet : `tokenURI(tokenId)`
			},
			{
				name: 'getBalanceOf',
        type: 'read',
				snippet : `getBalanceOf(address)`

			},
			{
				name: 'getOwnerOf',
        type: 'read',
				snippet : `getOwnerOf(tokenId)`
			},
	

		]
	},
	[Modules.erc20]: {
		name: 'ERC20',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
		to: '/modules/erc20',
		args: {
			token: 'Token Name',
			symbol: 'Token Symbol',
			decimals: 'Token Decimals',
		},
    codeSnippets: [
			{
				name: 'mint',
        type: 'mutate',
				snippet : `mint({amount?: number})`

			},
      {
				name: 'burn',
        type: 'mutate',
				snippet : `burn({amount?: number})`

			},
      {
				name: 'transfer',
        type: 'mutate',
				snippet : `transfer({ to: string, amount: number})`
			},
      {
				name: 'transferFrom',
        type: 'mutate',
				snippet : `transfer({ from:string, to: string, amount: number})`
			},
			{
				name: 'approve',
        type: 'mutate',
				snippet : `approve({spender: string, amount: number})`
			},
			{
				name: 'allowance',
        type: 'read',
				snippet : `setApprovalForAll({owner: string, spender: string})`
			},
			{
				name: 'getTotalSupply',
        type: 'read',
				snippet : `getTotalSupply()`
			},
			{
				name: 'getBalanceOf',
        type: 'read',
				snippet : `getBalanceOf(address: string)`
			},
			{
				name: 'getBalance',
        type: 'read',
				snippet : `getBalance()`
			},
			{
				name: 'getTokenName',
        type: 'read',
				snippet : `getTokenName()`
			},
      {
				name: 'getTokenSymbol',
        type: 'read',
				snippet : `getTokenSymbol()`
			},
	

		]
	},
	[Modules.tribes]: {
		name: 'Tribes',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
		to: '/modules/tribes',
	},
}

