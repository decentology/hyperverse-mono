enum Storage {
  Skynet = "skynet",
  Filecoin = "filecoin",
}

export default Storage;
export const StorageList: string[] = Object.values(Storage).filter(
  (v) => typeof v === "string"
);
