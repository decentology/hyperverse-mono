import Gateway from "./Gateway.cdc"
import FungibleToken from "./core-contracts/FungibleToken.cdc"
import NonFungibleToken from "./core-contracts/NonFungibleToken.cdc"
import ZayVerifierV2 from "./core-contracts/ZayVerifierV2.cdc"
import EmeraldIdentity from "./core-contracts/EmeraldIdentity.cdc"

pub contract GatewayModules {

  pub struct OwnsToken: Gateway.IModule {
    pub let path: PublicPath
    pub let amount: UFix64
    pub let identifier: String

    pub fun verify(_ params: {String: AnyStruct}) {
      let account = params["registree"]! as! Address
      let vault = getAccount(account).getCapability(self.path)
                            .borrow<&{FungibleToken.Balance}>()
                            ?? panic("Could not borrow the Vault from the path: ".concat(self.path.toString().concat(".")))
      assert(
        vault.getType().identifier == self.identifier,
        message: "Mismatched identifiers. "
                    .concat(vault.getType().identifier)
                    .concat(" on the Vault, but ")
                    .concat(self.identifier)
                    .concat(" on the passed in identifier.")
      )

      assert(
        vault.balance >= self.amount, 
        message: "The registree does not have enough "
              .concat(self.identifier)
              .concat(". They only have ")
              .concat(vault.balance.toString())
              .concat(" of the required ")
              .concat(self.amount.toString())
              .concat(".")
      )
    }

    init(_path: PublicPath, _amount: UFix64, _identifier: String) {
      self.path = _path
      self.amount = _amount
      self.identifier = _identifier
    }
  }

  pub struct OwnsNFT: Gateway.IModule {
    pub let path: PublicPath
    pub let identifier: String 

    pub fun verify(_ params: {String: AnyStruct}) {
      let account = params["registree"]! as! Address
      let collection = getAccount(account).getCapability(self.path)
                            .borrow<&{NonFungibleToken.CollectionPublic}>()
                            ?? panic("Could not borrow the Collection from the path: ".concat(self.path.toString().concat(".")))
      assert(
        collection.getType().identifier == self.identifier,
        message: "Mismatched identifiers. "
                    .concat(collection.getType().identifier)
                    .concat(" on the Collection, but ")
                    .concat(self.identifier)
                    .concat(" on the passed in identifier.")
      )

      assert(
        collection.getIDs().length >= 1, 
        message: "The registree does not have a "
              .concat(self.identifier)
              .concat(".")
      )
    }

    init(_path: PublicPath, _identifier: String) {
      self.path = _path
      self.identifier = _identifier
    }
  }

  pub struct Timelock: Gateway.IModule {
        pub let dateStart: UFix64
        pub let dateEnding: UFix64

        pub fun verify(_ params: {String: AnyStruct}) {
            assert(
                getCurrentBlock().timestamp >= self.dateStart,
                message: "This Whitlist has not started yet."
            )
            assert(
                getCurrentBlock().timestamp <= self.dateEnding,
                message: "Sorry! The time has run out to mint this Whitelist."
            )
        }

        init(_dateStart: UFix64, _timePeriod: UFix64) {
            self.dateStart = _dateStart
            self.dateEnding = self.dateStart + _timePeriod
        }
    }

    pub struct Limited: Gateway.IModule {
        pub var capacity: UInt64

        pub fun verify(_ params: {String: AnyStruct}) {
            let whitelist = params["whitelist"]! as! &Gateway.Whitelist{Gateway.WhitelistPublic}
            let currentCapacity = whitelist.getRegistered().length
            assert(
                currentCapacity < Int(self.capacity),
                message: "This Whitelist is at capacity."
            )
        }

        init(_capacity: UInt64) {
            self.capacity = _capacity
        }
    }
}