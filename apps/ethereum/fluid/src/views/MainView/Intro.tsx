export const Intro = () => {
	return (
		<section className="w-full bg-gradient-to-r from-indigo-900 to-indigo-400" id="fluidity">
			<div className="max-w-7xl mx-auto w-full mt-24 py-16 px-8">
				<h2 className="text-3xl font-bold text-white content">Bootstrap your DAO with</h2>
				<h1 className="text-7xl sm:text-[8rem] text-indigo-100 font-extrabold">fluidity</h1>
				<h2 className="mt-8 text-3xl font-bold text-white">
					Stream a <span className="text-indigo-400">token</span> over a period of time
				</h2>
			</div>
			<div className="max-w-7xl mx-auto w-full pb-16 px-8 space-y-8">
				<p className="text-xl text-white">
					With <span className="text-red-400 font-extrabold">fluidity</span>:
				</p>
				<ol className="space-y-2 text-lg">
					<li>
						<span className="mr-2 text-white" role="img" aria-label="document">
							📄
						</span>{' '}
						<span className="text-white">
							create smart contracts to manage your NFT memberships
						</span>
					</li>
					<li>
						<span className="mr-2" role="img" aria-label="water-wave">
							🌊
						</span>{' '}
						<span className="text-white">
							provide a vesting schedule through streaming tokens over a period of
							time
						</span>
					</li>
					<li>
						<span className="mr-2" role="img" aria-label="money-with-wings">
							💸
						</span>{' '}
						<span className="text-white">
							gain liquidity in your treasury with stables, ETH, or your choice of
							token
						</span>
					</li>
					<li></li>
				</ol>
			</div>
		</section>
	);
};
