import { FC, ReactNode } from 'react';
import clsx from 'clsx';

import Footer from '../Footer';
import HeadTags from '../Head/HeadTags';
import MainLayout from '../MainLayout';
import TopBar from '../TopBar';

interface PageLayoutProps {
	className?: string;
	children: ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({ className, children }) => {
	return (
		<>
			<HeadTags />
			<MainLayout>
				<TopBar />
				<main className={clsx(className, 'w-full flex-1 flex flex-col items-center')}>
					{children}
				</main>
			</MainLayout>
			<Footer />
		</>
	);
};

export default PageLayout;
