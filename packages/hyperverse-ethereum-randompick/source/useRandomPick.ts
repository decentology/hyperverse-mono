import { useState, useEffect, useCallback } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "react-query";
import { ethers } from "ethers";
import { useEthereum } from "@decentology/hyperverse-ethereum";
import { ContractABI, CONTRACT_ADDRESS } from "./Provider";
import { useEvent } from "react-use";
import { useStorage } from "@decentology/hyperverse-storage-skynet";
import { createContainer, useContainer } from "unstated-next";

type ContractState = ethers.Contract;

function TribesState(initialState: { tenantId: string } = { tenantId: "" }) {
  const { tenantId } = initialState;
  const queryClient = useQueryClient();
  const { address, web3Provider, provider, connect } = useEthereum();
  const { clientUrl } = useStorage();
  const [contract, setTribesContract] = useState<ContractState>(
    new ethers.Contract(
      CONTRACT_ADDRESS,
      ContractABI,
      provider
    ) as ContractState
  );
  const { uploadFile } = useStorage();
  const setup = useCallback(async () => {
    const signer = await web3Provider?.getSigner();
    if (signer && contract) {
      const ctr = contract.connect(signer) as ContractState;
      setTribesContract(ctr);
    }
  }, [web3Provider]);

  const formatTribeResultFromTribeId = useCallback(
    async (tribeId: number) => {
      const txn = await contract.getTribeData(tenantId, tribeId);
      const link = txn.replace("sia:", "");
      const json = JSON.parse(
        // eslint-disable-next-line no-await-in-loop
        await (await fetch(`${clientUrl}/${link}`)).text()
      );

      json.id = tribeId;
      json.imageUrl = `${clientUrl}/${json.image.replace("sia:", "")}`;
      return json;
    },
    [contract]
  );

  const errors = (err: any) => {
    if (!contract?.signer) {
      throw new Error("Please connect your wallet!");
    }

    if (err.code === 4001) {
      throw new Error("You rejected the transaction!");
    }

    if (err.message.includes("User is already in a Tribe!")) {
      throw new Error("You are already in a tribe!");
    }

    throw err;
    // throw new Error("Something went wrong!");
  };

  useEffect(() => {
    if (web3Provider) {
      setup();
    }
  }, [web3Provider]);

  const checkInstance = useCallback(
    async (account: any) => {
      try {
        const instance = await contract.instance(account);
        return instance;
      } catch (err) {
        return false;
      }
    },
    [contract]
  );

  const createInstance = useCallback(async () => {
    try {
      const createTxn = await contract.createInstance();
      return createTxn.wait();
    } catch (err) {
      errors(err);
      throw err;
    }
  }, [contract]);

  const getTotalTenants = useCallback(async () => {
    try {
      const tenantCount = await contract.tenantCount();

      return tenantCount.toNumber();
    } catch (err) {
      throw err;
    }
  }, [contract]);

  const addTribe = useCallback(
    async (metadata: Omit<MetaData, "image">, image: File) => {
      try {
        // TODO: Add progress indicator notices for steps
        // 1. Upload file notification
        // 2. Upload metadata information
        // 3. Success notification

        const { skylink: imageLink } = await uploadFile(image);
        const fullMetaData: MetaData = {
          ...metadata,
          image: imageLink.replace("sia:", ""),
        };
        const metadataFile = new File(
          [JSON.stringify(fullMetaData)],
          "metadata.json"
        );
        const { skylink: metadataFileLink } = await uploadFile(metadataFile);

        const addTxn = await contract.addNewTribe(
          metadataFileLink.replace("sia:", "")
        );
        return addTxn.wait();
      } catch (err) {
        errors(err);
        throw err;
      }
    },
    [contract]
  );

  const getTribeId = useCallback(
    async (account) => {
      try {
        const id = await contract.getUserTribe(tenantId, account);
        return id.toNumber();
      } catch (err) {
        if (err instanceof Error) {
          if (err.message.includes("This member is not in a Tribe!")) {
            return null;
          }
        }
        errors(err);
      }
    },
    [contract]
  );

  const getTribe = useCallback(
    async (id) => {
      try {
        const userTribeTxn = await contract.getTribeData(tenantId, id);
        // return userTribeTxn;
        return formatTribeResultFromTribeId(id);
      } catch (err) {
        errors(err);
      }
    },
    [contract]
  );

  const leaveTribe = useCallback(async () => {
    try {
      const leaveTxn = await contract.leaveTribe(tenantId);
      await leaveTxn.wait();
      return leaveTxn.hash;
    } catch (err) {
      errors(err);
    }
  }, [contract]);

  const getAllTribes = useCallback(async () => {
    try {
      const tribesData = await contract.totalTribes(tenantId);
      const tribes = [];
      for (let tribeId = 1; tribeId <= tribesData.toNumber(); ++tribeId) {
        const json = await formatTribeResultFromTribeId(tribeId);
        tribes.push(json);
      }

      return tribes;
    } catch (err) {
      errors(err);
    }
  }, [contract]);

  const joinTribe = useCallback(
    async (id) => {
      try {
        const joinTxn = await contract.joinTribe(tenantId, id);
        return joinTxn.wait();
      } catch (err) {
        errors(err);
      }
    },
    [contract]
  );

  const useTribeEvents = (eventName: string, callback: any) => {
    return useEvent(eventName, useCallback(callback, [contract]), contract);
  };

  return {
    tenantId,
    contract,
    useTribeEvents,
    CheckInstance: () =>
      useQuery(
        ["checkInstance", address, contract?.address],
        () => checkInstance(address),
        {
          enabled: !!address && !!contract?.address,
        }
      ),
    NewInstance: (
      options?: Omit<
        UseMutationOptions<unknown, unknown, void, unknown>,
        "mutationFn"
      >
    ) => useMutation(createInstance, options),
    TotalTenants: () =>
      useQuery(["totalTenants", contract?.address], () => getTotalTenants(), {
        enabled: !!contract?.address,
      }),
    AddTribe: (
      options?: Omit<
        UseMutationOptions<
          unknown,
          unknown,
          { metadata: Omit<MetaData, "image">; image: File },
          unknown
        >,
        "mutationFn"
      >
    ) =>
      useMutation(
        (payload) => addTribe(payload.metadata, payload.image),
        options
      ),
    Tribes: () =>
      useQuery(["tribes", contract?.address], () => getAllTribes(), {
        enabled: !!contract?.address,
      }),
    Join: (
      options?: Omit<
        UseMutationOptions<unknown, unknown, unknown, unknown>,
        "mutationFn"
      >
    ) => useMutation((id) => joinTribe(id), options),
    Leave: (
      options?: Omit<
        UseMutationOptions<unknown, unknown, void, unknown>,
        "mutationFn"
      >
    ) =>
      useMutation(() => leaveTribe(), {
        ...options,
        onSuccess: (...args) => {
          queryClient.clear();
          const fn = options?.onSuccess;
          if (fn) fn(...args);
        },
      }),
    TribeId: () =>
      useQuery(
        ["getTribeId", address, contract?.address],
        () => getTribeId(address),
        {
          enabled: !!address && !!contract?.address,
          retry: false,
        }
      ),
    Tribe: () => {
      const { data: tribeId } = useQuery(
        ["getTribeId", address, contract?.address],
        () => getTribeId(address),
        { enabled: !!address && !!contract?.address }
      );
      return useQuery(["getTribeData", tribeId], () => getTribe(tribeId), {
        enabled: !!tribeId,
      });
    },
  };
}

export const RandomPick = createContainer(TribesState);

export function useRandomPick() {
  return useContainer(RandomPick);
}
