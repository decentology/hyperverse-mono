pub contract NumberContract {
  pub var id: UInt64

  pub fun updateId() {
    self.id = self.id + 1
  }

  init() {
    self.id = 1
  }
}