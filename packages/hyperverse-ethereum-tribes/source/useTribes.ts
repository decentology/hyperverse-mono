import { useState, useEffect, useCallback } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "react-query";
import { ethers } from "ethers";
import { useEthereum } from "@decentology/hyperverse-ethereum";
import { ContractABI, TENANT_ADDRESS, CONTRACT_ADDRESS } from "./Provider";
import { useEvent } from "react-use";
import { useStorage } from "@decentology/hyperverse-storage-skynet";
import { createContainer, useContainer } from "unstated-next";
import { SkynetClient } from "skynet-js";

type ContractState = ethers.Contract | null;

type MetaData = {
  name: string;
  description: string;
  image: string;
};

function TribesState(initialState: { tenantId: string } = { tenantId: "" }) {
  const [contract, setTribesContract] = useState<ContractState>();
  const queryClient = useQueryClient();
  const { address, web3Provider, provider, connect } = useEthereum();
  const { uploadFile } = useStorage();

  const setup = async () => {
    const signer = await web3Provider?.getSigner();
    if (signer && contract) {
      const ctr = contract.connect(signer) as ContractState;
      setTribesContract(ctr);
    }
  };

  useEffect(() => {
    const ctr = new ethers.Contract(
      CONTRACT_ADDRESS,
      ContractABI,
      provider
    ) as ContractState;
    setTribesContract(ctr);
  }, []);

  useEffect(() => {
    if (!web3Provider) {
      return;
    }
    setup();
  }, [web3Provider]);

  const checkInstance = useCallback(
    async (account: any) => {
      try {
        if (!contract) {
          return;
        }
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
      if (!contract) {
        return;
      }

      if (!contract.signer) {
        connect();
      }

      const createTxn = await contract.createInstance();
      return createTxn.wait();
    } catch (err) {
      throw err;
    }
  }, [contract]);

  const getTotalTenants = useCallback(async () => {
    try {
      if (!contract) {
        return;
      }
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
        if (!contract) {
          return;
        }
        if (!contract.signer) {
          connect();
        }
        const addTxn = await contract.addNewTribe(
          metadataFileLink.replace("sia:", "")
        );
        return addTxn.wait();
      } catch (err) {
        throw err;
      }
    },
    [contract]
  );

  const getTribeId = useCallback(
    async (account) => {
      if (!contract) {
        return;
      }
      try {
        const id = await contract.getUserTribe(TENANT_ADDRESS, account);
        return id.toNumber();
      } catch (err) {
        throw err;
      }
    },
    [contract]
  );

  const getTribe = useCallback(
    async (id) => {
      try {
        if (!contract) {
          return;
        }
        const userTribeTxn = await contract.getTribeData(TENANT_ADDRESS, id);
        return userTribeTxn;
      } catch (err) {
        throw err;
      }
    },
    [contract]
  );

  const leaveTribe = useCallback(async () => {
    try {
      if (!contract) {
        return;
      }

      if (!contract.signer) {
        connect();
      }

      const leaveTxn = await contract.leaveTribe(TENANT_ADDRESS);
      await leaveTxn.wait();
      return leaveTxn.hash;
    } catch (err) {
      throw err;
    }
  }, [contract]);

  const getAllTribes = useCallback(async () => {
    try {
      if (!contract) {
        return;
      }
      const tribesData = await contract.totalTribes(TENANT_ADDRESS);
      const tribes = [];
      for (let i = 1; i <= tribesData.toNumber(); ++i) {
        // eslint-disable-next-line no-await-in-loop
        const txn = await contract.getTribeData(TENANT_ADDRESS, i);
        const link = txn.replace("sia:", "");
        const json = JSON.parse(
          // eslint-disable-next-line no-await-in-loop
          await (await fetch(`https://siasky.net/${link}`)).text()
        );

        json.id = i;
        json.image = `https://siasky.net/${json.image.replace("sia:", "")}/`;

        tribes.push(json);
      }

      return tribes;
    } catch (err) {
      throw err;
    }
  }, [contract]);

  const joinTribe = useCallback(
    async (id) => {
      try {
        if (!contract) {
          return;
        }

        if (!contract.signer) {
          connect();
        }
        const joinTxn = await contract.joinTribe(TENANT_ADDRESS, id);
        return joinTxn.wait();
      } catch (err) {
        throw err;
      }
    },
    [contract]
  );

  const useTribeEvents = (eventName: string, callback: any) => {
    // @ts-ignore
    return useEvent(eventName, useCallback(callback, [contract]), contract);
  };

  return {
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

export const Tribes = createContainer(TribesState);

export function useTribes() {
  return useContainer(Tribes);
}
