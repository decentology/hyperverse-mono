import { useState, useEffect, useCallback } from "react";
import {
  useQuery,
  useMutation,
  UseMutationOptions,
} from "react-query";
import { ethers } from "ethers";
import { useEthereum } from "@decentology/hyperverse-ethereum";
import { ContractABI, CONTRACT_ADDRESS } from "./Provider";
import { createContainer, useContainer } from "unstated-next";

type ContractState = ethers.Contract;

function RandomPickState(initialState: { tenantId: string } = { tenantId: "" }) {
  const { tenantId } = initialState;
  const { address, web3Provider, provider, connect } = useEthereum();
  const [contract, setRandomPickContract] = useState<ContractState>(
    new ethers.Contract(
      CONTRACT_ADDRESS,
      ContractABI,
      provider
    ) as ContractState
  );

  const setup = useCallback(async () => {
    const signer = await web3Provider?.getSigner();
    if (signer && contract) {
      const ctr = contract.connect(signer) as ContractState;
      setRandomPickContract(ctr);
    }
  }, [web3Provider]);

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

  const startRandomPick = useCallback(async (numbers) => {
    try {
      const tx = await contract.startRandomPick(numbers);
      return tx.wait();
    } catch (err) {
      errors(err);
      throw err;
    }
  }, [contract]);

  const getRandomPick = useCallback(async (tenant) => {
    try {
      const randomPick = await contract.results(tenant);

      return randomPick.toNumber();
    } catch (err) {
      throw err;
    }
  }, [contract]);

  return {
    tenantId,
    contract,
    StartRandomPick: () =>
      useQuery(
        ["startRandomPick"],
        () => startRandomPick(),
        {
          enabled: !!address && !!contract?.address,
        }
      ),
    GetRandomPick: () =>
      useQuery(["getRandomPick", address], () => getRandomPick(address), {
        enabled: !!contract?.address,
      })
  };
}

export const RandomPick = createContainer(RandomPickState);

export function useRandomPick() {
  return useContainer(RandomPick);
}
