import { FC } from 'react';
import clsx from 'clsx';

interface HowThisWorksProps {
	className?: string;
}

const HowThisWorks: FC<HowThisWorksProps> = ({ className }) => {
	return (
		<section
			className={clsx(className, 'w-full bg-gradient-to-r from-indigo-900 to-indigo-400')}
			id="create-instance"
		>
			<div className="max-w-7xl mx-auto py-16 px-8 text-white">
				<h1 className="text-7xl font-bold">How this works</h1>
				<p className="mt-4 text-xl">
					Begin by defining your NFT metadata (name and symbol), which you'll use for all
					of your streaming NFTs.
				</p>
				<p className="mt-4 text-xl">
					You'll need to create an instance of your NFT and then mint the NFTs
					individually.
				</p>
			</div>
		</section>
	);
};

export default HowThisWorks;
