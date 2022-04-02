const fcl = require('@onflow/fcl');
const t = require('@onflow/types');
import { FlowTransaction } from '..';

async function setup() {
	try {
		const transactionID = await fcl.send([
			fcl.transaction`
				import ExampleToken from 0xToken
				
				transaction() {
						prepare(signer: AuthAccount) {
								if signer.borrow<&ExampleToken.Vault>(from: ExampleToken.VaultStoragePath) == nil {
									signer.save(<- ExampleToken.createEmptyVault(), to: ExampleToken.VaultStoragePath)
								  signer.link<&ExampleToken.Vault{ExampleToken.VaultPublic}>(ExampleToken.VaultPublicPath, target: ExampleToken.VaultStoragePath)
								}

								if signer.borrow<&ExampleToken.Minter>(from: ExampleToken.MinterStoragePath) == nil {
									signer.save(<- ExampleToken.createMinter(), to: ExampleToken.MinterStoragePath)
								}
						}
						execute {
								
						}
				}
      `,
			fcl.args([]),
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

export { setup };
