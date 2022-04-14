const fcl = require('@onflow/fcl');
const t = require('@onflow/types');
import { FlowTransaction } from '../types';

async function register(host: string, whitelistId: number) {
	try {
		const transactionID = await fcl.send([
			fcl.transaction`
			import Gateway from 0xGateway

			transaction(host: Address) {
			
				let Registry: &Gateway.Registry
				let Whitelist: &Gateway.Whitelist{Gateway.WhitelistPublic}

				prepare(acct: AuthAccount) {
					// set up the Registry where users will store all their created events
					if acct.borrow<&Gateway.Registry>(from: Gateway.RegistryStoragePath) == nil {
						acct.save(<- Gateway.createEmptyRegistry(), to: Gateway.RegistryStoragePath)
						acct.link<&Gateway.Registry{Gateway.RegistryPublic}>(Gateway.RegistryPublicPath, target: Gateway.RegistryStoragePath)
					}

					let HostRegistry = getAccount(host).getCapability(Gateway.RegistryPublicPath)
															.borrow<&Gateway.Registry{Gateway.RegistryPublic}>()
															?? panic("Could not borrow the public Registry from the host.")
					
					self.Whitelist = HostRegistry.borrowPublicWhitelistRef(whitelistId: whitelistId)

					self.Registry = acct.borrow<&Gateway.Registry>(from:  Gateway.RegistryStoragePath)
														?? panic("Could not borrow the Registry from the signer of registering.")
				}

				execute {
					self.Registry.register(whitelist: self.Whitelist, params: {})
				}
			}
 
      `,
			fcl.args([
				fcl.arg(host, t.Address),
				fcl.arg(whitelistId, t.UInt64)
			]),
			fcl.payer(fcl.authz),
			fcl.proposer(fcl.authz),
			fcl.authorizations([fcl.authz]),
			fcl.limit(9999),
		])
			.then(fcl.decode);

		return fcl.tx(transactionID).onceSealed() as Promise<FlowTransaction>;
	} catch (error) {
		console.error(error);
	}
}

export { register };
