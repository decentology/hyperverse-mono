import { FC, useMemo, useState } from "react";
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
  const getLink = (siaLink: string) =>
    `${clientUrl}/${siaLink.replace("sia:", "")}`;
  return {
    uploadFile: uploadFile.bind(client),
    uploadDirectory: uploadDirectory.bind(client),
    downloadFile: downloadFile.bind(client),
    openFile: openFile.bind(client),
    getLink: getLink,
    client,
    clientUrl
  };
}

const Storage = createContainer(StorageState);
export const Provider = Storage.Provider;

export function useStorage() {
  return Storage.useContainer();
}
