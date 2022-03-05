import { FC } from 'react';
import { Intro } from './Intro';
import { Faq } from './Faq';
import { Team } from './Team';

interface MainViewProps {
	className?: string;
}

const MainView: FC<MainViewProps> = ({ className }) => {
	return (
		<>
			<Intro />
			<Team />
			<Faq />
		</>
	);
};

MainView.displayName = 'MainView';

export default MainView;
