import { useWriteContract } from '@web3-ui/hooks';
import { useERC721 } from '@decentology/hyperverse-ethereum-fluid';
import { useEthereum } from '@decentology/hyperverse-ethereum';

import { IConstantFlowAgreementV1, ISuperfluid, FluidNFT } from '../../types/contracts';
import { HOST_ADDRESS, CFA_ADDRESS } from '../../constants';
import cfaJSON from '../../abis/IConstantFlowAgreementV1.json';
import hostJSON from '../../abis/ISuperfluid.json';
import fluidNftJSON from '../../abis/FluidNFT.json';

export const ContractInfo = ({ nftContractItem }: any) => {
	const { address } = useEthereum();
	const { Proxy, TotalSupply, Balance } = useERC721();
	const { data: proxyAddress, isSuccess: proxyIsSuccess } = Proxy();

	const [hostContract, hostContractIsReady] = useWriteContract<ISuperfluid>(
		HOST_ADDRESS,
		hostJSON.abi
	);
	const [cfaContract, cfaContractIsReady] = useWriteContract<IConstantFlowAgreementV1>(
		CFA_ADDRESS,
		cfaJSON.abi
	);
	const [nftContract, nftContractIsReady] = useWriteContract<FluidNFT>(
		proxyAddress,
		fluidNftJSON.abi
	);

	return (
		<section className="w-full bg-white" id="start">
			<div className="max-w-7xl mx-auto py-16 px-8 text-black">
				<h1 className="text-7xl font-bold">contract info</h1>
				<div className="mt-4 text-lg">
					<b>Wallet:</b> {address || 'Not connected'}
				</div>
				{proxyAddress && (
					<div className="mt-4">
						<div className="text-lg font-bold">Proxy Contract Details</div>
						<ol>
							<li>
								<b>Address:</b> {proxyAddress}
							</li>
							<li>
								<b>isReady:</b> {proxyIsSuccess}
							</li>
						</ol>
					</div>
				)}
				{hostContract && (
					<div className="mt-4">
						<div className="text-lg font-bold">Host Contract Details</div>
						<ol>
							<li>
								<b>Address:</b> {hostContract.address}
							</li>
							<li>
								<b>isReady:</b> {hostContractIsReady.toString()}
							</li>
						</ol>
					</div>
				)}
				{cfaContract && (
					<div className="mt-4">
						<div className="text-lg font-bold">CFA Contract Details</div>
						<ol>
							<li>
								<b>Address:</b> {cfaContract.address}
							</li>
							<li>
								<b>isReady:</b> {cfaContractIsReady.toString()}
							</li>
						</ol>
					</div>
				)}
				{nftContract && (
					<div className="mt-4">
						<div className="text-lg font-bold">NFT Contract Details</div>
						<ol>
							<li>
								<b>Address:</b> {nftContract.address}
							</li>
							<li>
								<b>isReady:</b> {nftContractIsReady.toString()}
							</li>
							<li>
								<b>Name:</b> {nftContractItem?.name}
							</li>
							<li>
								<b>Base URI:</b> {nftContractItem?.baseUri}
							</li>
						</ol>
					</div>
				)}
			</div>
		</section>
	);
};
