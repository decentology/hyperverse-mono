import { createContext, FC, useContext, useEffect, useState } from "react";
import { SkynetClient } from "skynet-js";

type StorageContext = {
  uploadFile: SkynetClient['uploadFile'];
  uploadDirectory: SkynetClient["uploadDirectory"];
  downloadFile: SkynetClient["downloadFile"];
  openFile: SkynetClient["openFile"];
  client: SkynetClient;
} | null;

export const Context = createContext<StorageContext>(null);
Context.displayName = "StorageContext";

export const Provider: FC<{ clientUrl: string }> = ({
  children,
  clientUrl,
}) => {
  const [client] = useState<SkynetClient>(
    new SkynetClient(clientUrl || "https://siasky.net")
  );
  const { uploadFile, uploadDirectory, downloadFile, openFile } = client || {};
  return (
    <Context.Provider
      value={{
        uploadFile,
        uploadDirectory,
        downloadFile,
        openFile,
        client,
      }}
    >
      {children}
    </Context.Provider>
  );
};
