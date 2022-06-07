import { ERC721, ERC20, ERC777, StakeRewards, Whitelist, Tribes } from './components/icons'

export const MODULES  = {
	erc721: {
		name: 'ERC721',
		path: '/modules/erc721',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
		icon: ERC721,
		args: {
			token: 'Token Name',
			symbol: 'Token Symbol',
		},
		dappstarter: {
			app: 'NextJS',
			url: 'git clone https://github.com/decentology/hyperverse-mono',
		},
	},
	erc20: {
		name: 'ERC20',
		path: '/modules/erc20',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
		icon: ERC20,
		args: {
			token: 'Token Name',
			symbol: 'Token Symbol',
			decimals: 'Token Decimals',
		},
		dappstarter: {
			app: 'NextJS',
			url: 'https://nextjs.org/',
		},
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
	Paradigm: 'https://faucet.paradigm.xyz/',
	Github: 'https://github.com/decentology/hyperverse-mono',
	Discord: 'https://discord.gg/decentology',
	Decentology: 'https://decentology.com/',
	Docs: 'https://docs.hyperverse.dev/',
}
