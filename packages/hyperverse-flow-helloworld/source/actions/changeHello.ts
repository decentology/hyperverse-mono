const fcl = require('@onflow/fcl');
const t = require('@onflow/types');
import { FlowTransaction } from '..';

async function changeHello(newHello: string) {
    try {
        const transactionID = await fcl.send([
            fcl.transaction`
            import HelloWorld from 0xHelloWorld
            
            transaction(newHello: String) {
                let Tenant: &HelloWorld.Tenant
                prepare(signer: AuthAccount) {
                    if signer.borrow<&HelloWorld.Tenant>(from: HelloWorld.TenantStoragePath) == nil {
                        signer.save(<- HelloWorld.createTenant(), to: HelloWorld.TenantStoragePath)
                    }
                    self.Tenant = signer.borrow<&HelloWorld.Tenant>(from: HelloWorld.TenantStoragePath)
										?? panic("Could not borrow the HelloWorld.Tenant")
                }
                execute {
                    self.Tenant.changeHello(newHello: newHello)
                }
            }
            `,
            fcl.args([
                fcl.arg(newHello, t.String)
            ]),
            fcl.payer(fcl.authz),
            fcl.proposer(fcl.authz),
            fcl.authorizations([fcl.authz]),
            fcl.limit(9999),
        ]).then(fcl.decode);

        return fcl.tx(transactionID).onceSealed() as Promise<FlowTransaction>;
    } catch (error) {
        console.error(error);
    }
}

export { changeHello };
