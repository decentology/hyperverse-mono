import { FC } from 'react';
import Head from 'next/head';

interface HeadTagsProps {
	title?: string;
	description?: string;
}

const HeadTags: FC<HeadTagsProps> = ({ title, description }) => {
	return (
		<Head>
			<title>{title ?? 'Fluidity'}</title>
			<meta name='description' content={description ?? 'Team Fluidity for Web3Con Hackathon'} />
			<link rel='icon' href='/favicon.ico' />
		</Head>
	);
};

HeadTags.displayName = 'HeadTags';

export default HeadTags;
