# nft-game

`nft-game` is a sample [Next.js](https://nextjs.org/) interface utilizing the NFT-Game module from the [hyperverse](https://www.decentology.com/hyperverse). The aim of this project is to allow users to deploy and create their own NFT-Game Tenant.


## 💻 System Requirements

-   [Visual Studio Code](https://code.visualstudio.com/download) (or any IDE for editing JavaScript)
-   [Git](https://git-scm.com/)
-   [Node.js](https://nodejs.org/en/)
-   [Pnpm](https://pnpm.io/) or [Yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable)

## 🛠 Installation

To run this project locally:

1. In your terminal run these commands:
   clone the repository

    ```bash
    git clone https://github.com/decentology/hyperverse-mono.git
    ```

    ```bash
    cd hyperverse-mono
    ```
    ```bash
    cd apps/ethereum/nft-game
    ```

2. Download all the dependencies needed to run the project.

    ```bash
    pnpm i
    # or
    yarn i
    ```

  To run the development server run our custom script

    ```bash
    pnpm dev
    # or
    yarn dev
    ```

  Open [http://localhost:3000](http://localhost:3000/) with your browser to see the result.

### Testing and using your own instance

Once you create your own instance open up `pages/_app.tsx` and update the tenantID

```
	const hyperverse = initialize({
		blockchain: Ethereum,
		network: Network.Testnet,
		modules: [
			{
				bundle: NFTGame,
				tenantId: //Input the account you used to create your tenant here,
			},
		],
	});
```

### Prerequisities

To be able to interact with the dapp, you need a Metmask Wallet and Rinkeby eth.

1. **Metamask**

    If you do not have a metamask wallet, [here](https://www.surgewomen.io/learn-about-web3/set-up-metamask-wallet) is a guide you can follow on how to set up one.

2. **Rinkeby Faucets**

    To get some Rinkeby eth here are some available faucets you can request from:

-   https://faucet.paradigm.xyz/
-   https://app.mycrypto.com/faucet

    Or ask us to send you some in our [Discord Server.](http://discord.gg/decentology)
