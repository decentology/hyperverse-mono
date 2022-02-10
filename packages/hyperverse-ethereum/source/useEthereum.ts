import { useCallback, useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers, ethers } from "ethers";
import { createContainer, useContainer } from "unstated-next";
import Network from "@decentology/hyperverse/source/constants/networks";
import { useHyperverse } from "@decentology/hyperverse";

const INFURA_ID =
  process.env.NEXT_PUBLIC_ALCHEMY_API_KEY! ||
  "fb9f66bab7574d70b281f62e19c27d49";

const providerOptions = {
  walletconnect: {
    onClick: () => console.log("Test"),
    package: WalletConnectProvider, // required
    options: {
      onClick: () => console.log("Test 2"),
      infuraId: INFURA_ID, // required
    },
  },
};

let web3Modal: Web3Modal;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true,
    providerOptions, // required
  });
}

type State = {
  provider: any | null;
  web3Provider: providers.Web3Provider | null;
  address: string | null;
  chainId: number | null;
};

const switchNetwork = async (network: Network, prov: any) => {
  if (network === Network.Mainnet) {
    await prov.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x1" }],
    });
  } else {
    await prov.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x4" }],
    });
  }
};

function EthereumState() {
  const [state, setState] = useState<Omit<State, "disconnect" | "connect">>({
    provider: new ethers.providers.JsonRpcProvider(
      `https://rinkeby.infura.io/v3/${INFURA_ID}`
    ),
    web3Provider: null,
    address: null,
    chainId: null,
  });
  const { provider } = state;
  const addressRef = useRef(state.address);
  addressRef.current = state.address;
  const { network } = useHyperverse();
  const connect = useCallback(async function () {
    // This is the initial `provider` that is returned when
    // using web3Modal to connect. Can be MetaMask or WalletConnect.
    const externalProvider = await web3Modal.connect();

    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
    const web3Provider = new providers.Web3Provider(externalProvider);

    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();

    const userNetwork = await web3Provider.getNetwork();

    if (userNetwork.chainId !== 4) {
      await switchNetwork(network, web3Provider.provider);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }

    setState((prev) => ({
      ...prev,
      provider,
      web3Provider,
      address,
      chainId: userNetwork.chainId,
    }));
  }, []);

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }

      setState({
        provider: state.provider,
        web3Provider: null,
        address: null,
        chainId: null,
      });
    },
    [provider]
  );

  useEffect(() => {
    if (web3Modal) {
      // @ts-ignore - Using private method to override click event handler
      const click = web3Modal.userOptions[0].onClick;
      // @ts-ignore
      web3Modal.userOptions[0].onClick = () => {
        let flagTripped = false;
        const timeout = setTimeout(() => {
          // If not triggered in 2 seconds show alert to user
          (window as Window).removeEventListener("blur", blur);
          console.log("What is the address?", addressRef.current);
          if (!addressRef.current) {
            alert(
              "Click metamask icon in your chrome browser extension to sign in"
            );
          }
        }, 500);
        const blur = () => {
          flagTripped = true;
          clearTimeout(timeout);
          (window as Window).removeEventListener("blur", blur);
        };
        (window as Window).addEventListener("blur", blur);
        // Call original click event handler to trigger metamask
        click();
      };
    }
  }, [web3Modal]);

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect();
    }
  }, [connect]);

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        setState((prev) => ({ ...prev, address: accounts[0] }));
        disconnect();
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        window.location.reload();
      };

      const handleDisconnect = (error: { code: number; message: string }) => {
        web3Modal.clearCachedProvider();
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);
  return { ...state, connect, disconnect };
}

const Ethereum = createContainer(EthereumState);
export const Provider = Ethereum.Provider;
export function useEthereum() {
  return useContainer(Ethereum);
}
