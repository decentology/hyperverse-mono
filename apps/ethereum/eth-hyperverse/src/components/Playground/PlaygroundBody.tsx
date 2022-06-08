import Link from 'next/link'
import { useRouter } from 'next/router'
import { styled } from '../../../stitches.config'
import { LINKS } from '../../consts'
import { ERC20 } from '../Modules/ERC20'
import { ERC721 } from '../Modules/ERC721'

export const SmartModules = {
	erc721: {
		title: 'ERC721',
		component: ERC721,
	},
	erc20: {
		title: 'ERC20',
		component: ERC20,
	},

}

export const PlaygroundBody = () => {
	const router = useRouter()
	const { module } = router.query

	const moduleDefault = module?.toString() ?? 'erc721'
	return (
		<Container>
			<SubContainer>
				<h1>
					{/* @ts-ignore */}
					{SmartModules[moduleDefault].title}
					&nbsp;Smart Module
				</h1>
				<div>
					<Dot />
					<p>audit in progress</p>
				</div>
			</SubContainer>
					{/* @ts-ignore */}
			<ContentContainer>{SmartModules[moduleDefault].component()}</ContentContainer>
		</Container>
	)
}

const Container = styled('div', {
	display: 'flex',
	flexDirection: 'column',

})

const SubContainer = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'baseline',
	fontFamily: '$mono',
	fontWeight: '400',

	h1: {
		fontSize: 24,
		textTransform: 'capitalize',
		span: {
			textTransform: 'uppercase',
		},
	},

	a: {
		color: '$white100',
	},

	div: {
		display: 'flex',
		alignItems: 'baseline',
		p: {
			fontWeight: '300',
			fontSize: 14,
			marginLeft: 10,
		},
	},
})

const ContentContainer = styled('div', {
	marginTop: 10,
	width: 1050,
	height: 630,
	background: '$blue100',
	borderRadius: 14,
	padding: '5px 10px',
})

const Dot = styled('span', {
	background: 'yellow',
	boxShadow: '0 0 0 1.2px yellow',
	height: 10,
	width: 10,
	borderRadius: '50%',
	display: 'inline-block',
})
