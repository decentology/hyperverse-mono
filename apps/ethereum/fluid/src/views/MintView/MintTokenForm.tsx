import { FC, FormEvent, useState } from 'react';

interface MintTokenFormProps {
	onSubmit: (receiver: string, flowRate: string) => void;
}

const MintTokenForm: FC<MintTokenFormProps> = ({ onSubmit }) => {
	const [receiver, setReceiver] = useState('');
	const [flowRate, setFlowRate] = useState('3858024691358');

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!receiver || !flowRate) return;
		onSubmit(receiver, flowRate);
	};

	return (
		<div className="w-3/6 mt-4 gap-4">
			<div>
				<p className="mt-4 text-xl">Begin by entering an NFT name and symbol.</p>
			</div>
			<form className="" onSubmit={handleSubmit}>
				<div className="flex gap-4 mt-4">
					<div className="w-full flex flex-col">
						<label htmlFor="receiver">Receiver</label>
						<input
							value={receiver}
							onChange={(e) => setReceiver(e.target.value)}
							id="receiver"
							type="text"
							className="w-full mt-1 py-2 px-3 form-control border border-solid border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-black"
							placeholder="0x"
						/>
					</div>
					<div className="w-full flex flex-col">
						<label htmlFor="flowRate">Flow Rate</label>
						<input
							value={flowRate}
							onChange={(e) => setFlowRate(e.target.value)}
							id="flowRate"
							type="text"
							className="w-full mt-1 py-2 px-3 form-control border border-solid border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-black"
							placeholder="Flow Rate"
						/>
					</div>
				</div>
				<div className="w-96 flex gap-4">
					<button
						type="submit"
						className="float-left mt-6 py-2 px-4 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-red-700 text-white font-bold"
					>
						Mint
					</button>
				</div>
			</form>
		</div>
	);
};

export default MintTokenForm;
