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
  const queryClient = useQueryClient();
  const { tenantId } = initialState
  const { address, web3Provider, provider, connect } = useEthereum();
  const [contract, setTribesContract] = useState<ContractState>(
    new ethers.Contract(
      CONTRACT_ADDRESS,
      ContractABI,
      provider
    ) as ContractState
  );
  const { uploadFile } = useStorage();
  const setup = async () => {
    const signer = await web3Provider?.getSigner();
    if (signer && contract) {
      const ctr = contract.connect(signer) as ContractState;
      setTribesContract(ctr);
    } else {
      setTribesContract(
        new ethers.Contract(
          CONTRACT_ADDRESS,
          ContractABI,
          provider
        ) as ContractState
      );
    }
  };

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
  }, [ web3Provider]);
  // useEffect(() => {
  //   const ctr = new ethers.Contract(
  //     CONTRACT_ADDRESS,
  //     ContractABI,
  //     provider
  //   ) as ContractState;
  //   setTribesContract(ctr);
  //   console.log("load", ctr, contract)
  // }, []);

  // useEffect(() => {

  //   console.log("web3Provider", web3Provider);
  //   if (!web3Provider) {
  //     return;
  //   }
  //   setup();
  // }, [web3Provider]);

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

      const createTxn = await contract.createInstance();
      return createTxn.wait();
    } catch (err) {
      errors(err);
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
        if (!contract) {
          return;
        }

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
      if (!contract) {
        return;
      }
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
        if (!contract) {
          return;
        }
        const userTribeTxn = await contract.getTribeData(tenantId, id);
        return userTribeTxn;
      } catch (err) {
        errors(err);
      }
    },
    [contract]
  );

  const leaveTribe = useCallback(async () => {
    try {
      if (!contract) {
        return;
      }

      const leaveTxn = await contract.leaveTribe(tenantId);
      await leaveTxn.wait();
      return leaveTxn.hash;
    } catch (err) {
      errors(err);
    }
  }, [contract]);

  const getAllTribes = useCallback(async () => {
    try {
      if (!contract) {
        return;
      }
      const tribesData = await contract.totalTribes(tenantId);
      const tribes = [];
      for (let i = 1; i <= tribesData.toNumber(); ++i) {
        // eslint-disable-next-line no-await-in-loop
        const txn = await contract.getTribeData(tenantId, i);
        const link = txn.replace("sia:", "");
        const json = JSON.parse(
          // eslint-disable-next-line no-await-in-loop
          await (await fetch(`https://fileportal.org/${link}`)).text()
        );

        json.id = i;
        json.image = `https://fileportal.org/${json.image.replace("sia:", "")}/`;

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
        if (!contract) {
          return;
        }


        const joinTxn = await contract.joinTribe(TENANT_ADDRESS, id);
        return joinTxn.wait();
      } catch (err) {
        errors(err);
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
