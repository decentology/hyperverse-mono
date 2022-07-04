import { ERC721Dashboard } from '../components/Modules/ERC721Dashboard'
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
	args?: {
		[key: string]: string
	}
}

export const ModulesInfo: { [key in Modules]: ModuleTypes } = {
	[Modules.erc721]: {
		name: 'ERC721',
		description: 'Create and own your own ERC721 Contract. This can be used for collection NFTs or 1:1 NFTs.',
		to: '/modules/erc721',
		args: {
			token: 'Token Name',
			symbol: 'Token Symbol',
		},
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
	},
	[Modules.tribes]: {
		name: 'Tribes',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
		to: '/modules/tribes',
	},
}

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
