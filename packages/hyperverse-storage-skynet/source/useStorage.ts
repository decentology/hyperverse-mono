import { FC, useState } from "react";
import { SkynetClient } from "skynet-js";
import { createContainer } from "unstated-next";

type StorageProps = {
  clientUrl: string;
};

function StorageState(
  { clientUrl }: StorageProps = { clientUrl: "https://siasky.net" }
) {
  const [client] = useState<SkynetClient>(new SkynetClient(clientUrl));
  const { uploadFile, uploadDirectory, downloadFile, openFile } = client;
  return {
    uploadFile: uploadFile.bind(client),
    uploadDirectory: uploadDirectory.bind(client),
    downloadFile: downloadFile.bind(client),
    openFile: openFile.bind(client),
    client,
  };
}

const Storage = createContainer(StorageState);
export const Provider = Storage.Provider;

export function useStorage() {
  return Storage.useContainer();
}
