pub contract ExampleToken {

    pub let VaultPublicPath: PublicPath
    pub let VaultStoragePath: StoragePath
    pub let MinterStoragePath: StoragePath

    /// Total supply of ExampleTokens in existence
    access(contract) var totalSupply: {Address: UFix64}

    /// TokensInitialized
    ///
    /// The event that is emitted when the contract is created
    pub event TokensInitialized()

    /// TokensWithdrawn
    ///
    /// The event that is emitted when tokens are withdrawn from a Vault
    pub event TokensWithdrawn(_ tenant: Address, amount: UFix64, from: Address?)

    /// TokensDeposited
    ///
    /// The event that is emitted when tokens are deposited to a Vault
    pub event TokensDeposited(_ tenant: Address, amount: UFix64, to: Address?)

    /// TokensMinted
    ///
    /// The event that is emitted when new tokens are minted
    pub event TokensMinted(_ tenant: Address, amount: UFix64)

    /// TokensBurned
    ///
    /// The event that is emitted when tokens are destroyed
    pub event TokensBurned(_ tenant: Address, amount: UFix64)

    /// MinterCreated
    ///
    /// The event that is emitted when a new minter resource is created
    pub event MinterCreated(_ tenant: Address, allowedAmount: UFix64)

    pub resource interface VaultPublic {
        pub fun getBalance(_ tenant: Address): UFix64?
        pub fun deposit(vault: @TransferVault)
    }

    /// Vault
    ///
    /// Each user stores an instance of only the Vault in their storage
    /// The functions in the Vault and governed by the pre and post conditions
    /// in FungibleToken when they are called.
    /// The checks happen at runtime whenever a function is called.
    ///
    /// Resources can only be created in the context of the contract that they
    /// are defined in, so there is no way for a malicious user to create Vaults
    /// out of thin air. A special Minter resource needs to be defined to mint
    /// new tokens.
    ///
    pub resource Vault: VaultPublic {

        /// The total balance of this vault
        access(contract) var balances: {Address: UFix64}

        pub fun getBalance(_ tenant: Address): UFix64? {
            return self.balances[tenant]
        }

        // initialize the balance at resource creation time
        init() {
            self.balances = {}
        }

        /// withdraw
        ///
        /// Function that takes an amount as an argument
        /// and withdraws that amount from the Vault.
        ///
        /// It creates a new temporary Vault that is used to hold
        /// the money that is being transferred. It returns the newly
        /// created Vault to the context that called so it can be deposited
        /// elsewhere.
        ///
        pub fun withdraw(_ tenant: Address, amount: UFix64): @TransferVault {
            pre {
                self.balances[tenant] != nil:
                    "You do not own anything from this tenant."
            }
            self.balances[tenant] = self.balances[tenant]! - amount
            emit TokensWithdrawn(tenant, amount: amount, from: self.owner?.address)
            return <-create TransferVault(tenant, _balance: amount)
        }

        /// deposit
        ///
        /// Function that takes a Vault object as an argument and adds
        /// its balance to the balance of the owners Vault.
        ///
        /// It is allowed to destroy the sent Vault because the Vault
        /// was a temporary holder of the tokens. The Vault's balance has
        /// been consumed and therefore can be destroyed.
        ///
        pub fun deposit(vault: @TransferVault) {
            let tenant = vault.tenant
            if self.balances[tenant] == nil {
                self.balances[tenant] = vault.balance
            } else {
                self.balances[tenant] = self.balances[tenant]! + vault.balance
            }
            emit TokensDeposited(tenant, amount: vault.balance, to: self.owner?.address)
            vault.reset()
            destroy vault
        }

        destroy() {
            for tenant in self.balances.keys {
                ExampleToken.totalSupply[tenant] = ExampleToken.totalSupply[tenant]! - self.balances[tenant]!
            }
        }
    }

    pub resource TransferVault {
        pub let tenant: Address
        pub var balance: UFix64

        access(contract) fun reset() {
            self.balance = 0.0
        }

        init(_ tenant: Address, _balance: UFix64) {
            self.tenant = tenant
            self.balance = _balance
        }

        destroy() {
            ExampleToken.totalSupply[self.tenant] = ExampleToken.totalSupply[self.tenant]! - self.balance
        }
    }

    /// createEmptyVault
    ///
    /// Function that creates a new Vault with a balance of zero
    /// and returns it to the calling context. A user must call this function
    /// and store the returned Vault in their storage in order to allow their
    /// account to be able to receive deposits of this token type.
    ///
    pub fun createEmptyVault(): @Vault {
        return <-create Vault()
    }

    /// Minter
    ///
    /// Resource object that token admin accounts can hold to mint new tokens.
    ///
    pub resource Minter {

        /// mintTokens
        ///
        /// Function that mints new tokens, adds them to the total supply,
        /// and returns them to the calling context.
        ///
        pub fun mintTokens(amount: UFix64): @TransferVault {
            pre {
                amount > 0.0: "Amount minted must be greater than zero"
            }
            let tenant = self.owner!.address
            if ExampleToken.totalSupply[tenant] == nil {
                ExampleToken.totalSupply[tenant] = amount 
            } else {
                ExampleToken.totalSupply[tenant] = ExampleToken.totalSupply[tenant]! + amount
            }
            emit TokensMinted(tenant, amount: amount)
            return <-create TransferVault(tenant, _balance: amount)
        }

    }

    pub fun createMinter(): @Minter {
        return <- create Minter()
    }

    pub fun getTotalSupply(_ tenant: Address): UFix64? {
        return self.totalSupply[tenant]
    }

    init() {
        self.totalSupply = {}
        self.VaultPublicPath = /public/ExampleTokenVault
        self.VaultStoragePath = /storage/ExampleTokenVault
        self.MinterStoragePath = /storage/ExampleTokenMinter

        emit TokensInitialized()
    }
}