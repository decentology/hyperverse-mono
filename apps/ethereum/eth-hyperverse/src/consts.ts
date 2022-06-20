import { ERC721, ERC20, ERC777, StakeRewards, Whitelist, Tribes } from './components/icons'



export const MODULES  = {
	erc721: {
		name: 'ERC721',
		path: '/modules/erc721',
		description: 'The ERC721 module allows you to mint and create NFTs.',

		icon: ERC721,
		args: {
			token: 'Token Name',
			symbol: 'Token Symbol',
		},
		dappstarter: {
			app: 'NextJS Boilerplate',
			url: 'git clone https://github.com/decentology/erc721-nextjs-boilerplate',
		},
	},
	erc20: {
		name: 'ERC20',
		path: '/modules/erc20',
		description: 'The ERC20 smart module allows you to create your own ERC20 token. ',
		icon: ERC20,
		args: {
			token: 'Token Name',
			symbol: 'Token Symbol',
			decimals: 'Token Decimals',
		},
		// dappstarter: {
		// 	app: 'NextJS',
		// 	url: 'https://nextjs.org/',
		// },
	},
	// erc777: {
	// 	name: 'ERC777',
	// 	path: '/playground/erc777',
	// 	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
	// 	icon: ERC777,
	// 	args: {
	// 		token: 'Token Name',
	// 		symbol: 'Token Symbol',
	// 		decimals: 'Token Decimals',
	// 	},
	// 	dappstarter: {
	// 		app: 'NextJS',
	// 		url: 'https://nextjs.org/',
	// 	},
	// },
	// {
	//   name: "StakeRewards",
	//   path: "/playground/stake-rewards",
	//   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
	//   icon: StakeRewards,
	// },
	// {
	//   name: "Whitelist",
	//   path: "/playground/whitelist",
	//   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
	//   icon: Whitelist,
	// },
	// {
	//   name: "Tribes",
	//   path: "/playground/tribes",
	//   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
	//   icon: Tribes,
	// },
}

export const LINKS = {
	Paradigm: 'https://docs.hyperverse.dev/learn/wallet/metamask#fund-your-wallet',
	Github: 'https://github.com/decentology/hyperverse-mono',
	Discord: 'https://discord.gg/decentology',
	Decentology: 'https://decentology.com/',
	Docs: 'https://docs.hyperverse.dev/',
}

export const ERC721CodeSnippets = 
	{
		ownerFunctions: [
			{
				name: 'tenant mint',
				description: 'mint a new token, an image is optional',
				snippet : `const tenantMint = erc721.tenantMint({address: string , image?: File})`
			},
			{
				name: 'initialize collection',
				description: 'for nft collections, this function will allow you to set the price, max supply, and max per user',
				snippet : `const initializeCollection = erc721.tenantMint({price: number, maxSupply: number, maxPerUser: number})`
			},
			{
				name: 'setMintPermissions',
				description: 'toggle mint permission to public or only owner',
				snippet : `const setMint = erc721.setMintPermissions(true)`

			},
			{
				name: 'setBaseURI',
				description: 'set the base URI for the collection',
				snippet : `const tenantMint = erc721.setBaseURI(baseURI)`
			},
			{
				name: 'withdraw',
				description: 'withdraw any ethereum stored in the contract',
				snippet : `const tenantMint = erc721.withdraw()`
			},
		],
		publicFunctions: [
			{
				name: 'mint',
				description: 'mint a new token',
				snippet : `const mint = erc721.mint({address: string , amount?: number})`

			},
			{
				name: 'getBaseURI',
				description: 'get the base URI for the collection',
				snippet : `const baseURI = erc721.getBaseURI()`
			},
			{
				name: 'tokenURI',
				description: 'get the token URI for a token',
				snippet : `const tokenURI = erc721.tokenURI(tokenId)`
			},
			{
				name: 'getBalanceOf',
				description: 'get the balance of a user',
				snippet : `const balance = erc721.getBalanceOf(address)`

			},
			{
				name: 'getOwnerOf',
				description: 'get the owner of a token',
				snippet : `const owner = erc721.getOwnerOf(tokenId)`
			},
			{
				name: 'transfer',
				description: 'transfer a token to another user',
				snippet : `const transfer = erc721.transfer({from: string , to: string, tokenId: number})`
			},
			{
				name: 'approve',
				description: 'approve a user to transfer a token',
				snippet : `const approve = erc721.approve({to: string, tokenId: number})`
			},
			{
				name: 'setApprovalForAll',
				description: 'approve an operator for the caller, allows operator to tranfer caller\'s tokens',
				snippet : `const setApprovalForAll = erc721.setApprovalForAll({operator: string, approved: boolean})`
			}

		]
	}
