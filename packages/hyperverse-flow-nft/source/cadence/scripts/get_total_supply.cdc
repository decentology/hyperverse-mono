import ExampleNFT from "../contracts/ExampleNFT.cdc"
						
pub fun main(tenantID: Address): UInt64? {
    return ExampleNFT.totalSupply[tenantID]
}