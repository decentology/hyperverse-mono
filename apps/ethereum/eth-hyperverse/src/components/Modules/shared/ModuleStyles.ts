import { Trigger, List, Content } from '@radix-ui/react-tabs'
import { Root } from '@radix-ui/react-scroll-area'

import { styled } from '../../../../stitches.config'

export const ModuleTabs = {
	DASHBOARD: 'dashboard',
	PLAYGROUND: 'playground',
} as const

export type ModuleTabs = typeof ModuleTabs[keyof typeof ModuleTabs]

export const ModuleContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	padding: 24,
	overflow: 'hidden',
	overflowY: 'auto',
	maxHeight: 800,
})

export const Heading = styled('h1', {
	fontFamily: '$mono',
	fontSize: 18,
	fontWeight: '400',
	marginRight: 8,
})

export const Header = styled(List, {
	display: 'flex',
	borderBottom: '1px solid rgba(255,255,255, 0.5)',
	paddingBottom: 2,
	marginBottom: 14,
})

export const PanelTrigger = styled(Trigger, {
	color: 'rgba(255,255,255, 0.5)',
	marginRight: 10,
	padding: '10px 8px 8px 0',
	cursor: 'pointer',
	background: 'transparent',
	border: 'none',

	variants: {
		active: {
			true: {
				color: 'rgba(255,255,255, 0.9) !important',
				borderBottom: '2px solid #fff',
				marginBottom: -4,
			},
		},
	},
})

export const ContentContainer = styled(Content, {
	maxHeight: 550,
	overflowY: 'auto',
})

export const ContentGrid = styled(Content, {
	maxHeight: 550,
	overflowY: 'auto',
	display: 'grid',
	columnGap: 20,
	gridTemplateColumns: 'repeat(3, 265px)',
	justifyContent: 'center',
	marginTop: 26,
	rowGap: 20,
})
