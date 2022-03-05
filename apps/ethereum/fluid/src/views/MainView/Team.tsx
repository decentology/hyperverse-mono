const TeamButton = ({ label, externalUrl }: { label: string; externalUrl?: string }) => {
	return externalUrl ? (
		<a href={externalUrl} target="_blank" rel="noreferrer noopener">
			<button
				type="button"
				className="py-1 px-2 bg-black hover:bg-indigo-700 text-white font-bold"
			>
				{label}
			</button>
		</a>
	) : (
		<button
			type="button"
			className="py-1 px-2 bg-black hover:bg-indigo-700 text-white font-bold"
		>
			{label}
		</button>
	);
};

export const Team = () => {
	return (
		<section className="w-full bg-white" id="team">
			<div className="max-w-7xl mx-auto w-full py-16 px-8">
				<div className="">
					<h1 className="text-7xl font-bold text-black">team</h1>
				</div>
				<div className="mt-8">
					<p className="text-black">
						Our ragtag team stepped into the{' '}
						<i className="font-bold text-violet-900">ether</i> and found each other
						during the web3con hackathon.
					</p>
				</div>
				<div className="mt-4 flex gap-6">
					<p className="text-black pt-1">We are:</p>
					<div className="flex gap-2">
						<TeamButton label="@billyjitsu" />
						<TeamButton label="@cryptokrizz" />
						<TeamButton label="@nathanng.eth" />
						<TeamButton label="@jerrod" />
						<TeamButton label="@nfter" />
					</div>
				</div>
			</div>
		</section>
	);
};
