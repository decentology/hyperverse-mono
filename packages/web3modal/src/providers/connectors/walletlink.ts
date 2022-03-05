import { IAbstractConnectorOptions } from "../../helpers";

export interface IWalletConnectConnectorOptions extends IAbstractConnectorOptions {
  infuraId?: string;
  rpc?: { [chainId: number]: string };
  chainId?: number;
  appName?: string;
  appLogoUrl?: string;
  darkMode?: boolean;
}

const ConnectToWalletLink = (
  WalletLink: any,
  opts: IWalletConnectConnectorOptions
) => {
  return new Promise(async (resolve, reject) => {
    let options = opts || {};
    let infuraId = options.infuraId || "";
    let chainId = options.chainId || 1;
    let appName = options.appName || "";
    let appLogoUrl = options.appLogoUrl;
    let darkMode = options.darkMode || false;

    let rpc = options.rpc || undefined;
    if (options.infuraId && !options.rpc) {
      rpc = `https://mainnet.infura.io/v3/${infuraId}`;
    }

    const walletLink = new WalletLink({
      appName,
      appLogoUrl,
      darkMode
    });

    try {
      const provider = walletLink.makeWeb3Provider(rpc, chainId);
      await provider.send('eth_requestAccounts');
      resolve(provider);
    } catch (e) {
      reject(e);
    }
  });
};

export default ConnectToWalletLink;
