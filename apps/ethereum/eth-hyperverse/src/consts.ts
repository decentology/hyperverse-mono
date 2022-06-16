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
