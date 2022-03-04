import { FC, FormEvent, useState } from 'react';

interface CreateInstanceFormProps {
	onSubmit: (nftName: string, nftSymbol: string) => void;
}

const CreateInstanceForm: FC<CreateInstanceFormProps> = ({ onSubmit }) => {
	const [nftName, setNftName] = useState('');
	const [nftSymbol, setNftSymbol] = useState('');

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!nftName || !nftSymbol) return;
		onSubmit(nftName, nftSymbol);
	};

	return (
		<div className="mt-4 w-3/6 gap-4">
			<p className="mt-4 text-xl">
				Begin by entering an NFT name and symbol which you'll use for all of your streaming
				NFTs.
			</p>
			<p className="mt-4 text-xl">
				You'll need to create an instance of your NFT and then mint the NFTs individually.
			</p>
			<form className="" onSubmit={handleSubmit}>
				<div className="flex gap-4 mt-4">
					<div className="w-full flex flex-col">
						<label htmlFor="nftName">Name</label>
						<input
							value={nftName}
							onChange={(e) => setNftName(e.target.value)}
							id="nftName"
							type="text"
							className="w-full py-2 px-3 form-control border border-solid border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-black"
							placeholder="web3con NFTs"
						/>
					</div>
					<div className="w-full flex flex-col">
						<label htmlFor="nftSymbol">Symbol</label>
						<input
							value={nftSymbol}
							onChange={(e) => setNftSymbol(e.target.value)}
							id="nftSymbol"
							type="text"
							className="w-full py-2 px-3 form-control border border-solid border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-black"
							placeholder="HACK"
						/>
					</div>
				</div>
				<div className="w-96 flex gap-4">
					<button
						type="submit"
						className="float-left mt-6 py-2 px-4 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-red-700 text-white font-bold"
					>
						Create instance
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateInstanceForm;
