import NumberContract from "../contracts/NumberContract.cdc"

transaction() {
  prepare(signer: AuthAccount) {

  }
  execute {
    NumberContract.updateId()
  }
}