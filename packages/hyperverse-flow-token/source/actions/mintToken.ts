const fcl = require('@onflow/fcl');
const t = require('@onflow/types');
import { FlowTransaction } from '../types';

async function mintToken(recipient: string, amount: string) {
	try {
		const transactionID = await fcl.send([
			fcl.transaction`
				import ExampleToken from 0xToken

				transaction(recipient: Address, amount: UFix64) {
						let Minter: &ExampleToken.Minter
						let Recipient: &ExampleToken.Vault{ExampleToken.VaultPublic}
						prepare(signer: AuthAccount) {
								self.Minter = signer.borrow<&ExampleToken.Minter>(from: ExampleToken.MinterStoragePath)
																				?? panic("Could not borrow the ExampleToken.Minter")
								self.Recipient = getAccount(recipient).getCapability(ExampleToken.VaultPublicPath)
																	.borrow<&ExampleToken.Vault{ExampleToken.VaultPublic}>()
																	?? panic("Could not borrow the ExampleToken.Vault{ExampleToken.VaultPublic}")
						}
						execute {
								let vaultTransferrable <- self.Minter.mintTokens(amount: amount)
								self.Recipient.deposit(vault: <- vaultTransferrable)
						}
				}
      `,
			fcl.args([
				fcl.arg(recipient, t.Address),
				fcl.arg(amount, t.UFix64),
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

export { mintToken };
