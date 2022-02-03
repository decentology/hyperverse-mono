import { createContext, FC, useContext, useEffect, useState } from "react";
import { SkynetClient } from "skynet-js";
// const SkyNetClient = require("skynet-js");

export const Context = createContext<any>({});
Context.displayName = "StorageContext";

export const Provider: FC<{ clientUrl: string }> = ({
  children,
  clientUrl,
}) => {
  const [client, setClient] = useState<any>(null);
  useEffect(() => {
    const client = new SkynetClient(clientUrl || "https://siasky.net");
    setClient(client);
  }, [setClient]);
  const { uploadFile, uploadDirectory, downloadFile, file, openFile, db } =
    client || {};
  return (
    <Context.Provider
      value={{
        uploadFile,
        uploadDirectory,
        downloadFile,
        file,
        openFile,
        client,
      }}
    >
      {children}
    </Context.Provider>
  );
};
