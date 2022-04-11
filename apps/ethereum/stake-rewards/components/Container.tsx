import { styled } from '../stitches.config';
import * as Tabs from '@radix-ui/react-tabs';
import TokenTab from './Token/TokenTab';
import StakeContainer from './StakeContainer';

const Container = () => {
	return (
		<Box>
			<StyledTabs defaultValue="tab1" orientation="vertical">
				<StyledList aria-label="tabs example">
				<StyledTrigger value="tab1">Stake Rewards Module</StyledTrigger>
					<StyledTrigger value="tab2">Token Module</StyledTrigger>
				</StyledList>
				<StyledContent value="tab1">
					<StakeContainer />
				</StyledContent>
				<StyledContent value="tab2">
					<TokenTab />
				</StyledContent>

			</StyledTabs>
		</Box>
	);
};

export default Container;

const Box = styled('div', {
	display: 'flex',
	overflowY: 'scroll',
	flexDirection: 'column',
	marginTop: '1rem',
	borderRadius: '10px',
	backgroundColor: '$gray100',
	height: '70vh',
	padding: '0 2rem 2rem',
	color: '$blue500',
	'& h3': {
		marginTop: '2rem',
	},
});

const Section = styled('div', {
	marginTop: '1rem',
	display: 'grid',
	gridTemplateColumns: '270px 270px 270px 257px',
	gridGap: '10px',
});

const Info = styled('div', {
	marginTop: '2rem',
	color: '$gray200',
});

const StyledTabs = styled(Tabs.Root, {
	display: 'flex',
	flexDirection: 'column',
	background: '$gray100',
	width: '100%',
	boxShadow: `0 2px 10px $blue200`,
});

const StyledList = styled(Tabs.List, {
	marginTop: '1rem',
	flexShrink: 0,
	display: 'flex',
	borderBottom: `1px solid $blue500`,
	backgroundColor: '$white100',
	borderRadius: '10px 10px 0 0 ',
});

const StyledTrigger = styled(Tabs.Trigger, {
	all: 'unset',
	fontFamily: 'inherit',
	cursor: 'pointer',
	padding: '0 20px',
	height: 45,
	flex: 1,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: 15,
	lineHeight: 1,
	color: '$gray600',
	userSelect: 'none',
	'&:first-child': { borderTopLeftRadius: 6 },
	'&:last-child': { borderTopRightRadius: 6 },
	'&:hover': { color: '$blue500' },
	'&[data-state="active"]': {
		color: '$blue500',
		boxShadow: 'inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor',
	},
});

const StyledContent = styled(Tabs.Content, {
	backgroundColor: '$white100',
	padding: '0 1rem 1rem',
	borderRadius: '0 0 10px 10px',
});
