import { useState, useEffect, useCallback } from "react";
import {
  useMutation,
  UseMutationOptions,
  useQuery
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
    throw err;
    // throw new Error("Something went wrong!");
  };

  useEffect(() => {
    if (web3Provider) {
      setup();
    }
  }, [web3Provider]);

  const startRandomPick = useCallback(async (numbers: Number[]) => {
    try {
      const tx = await contract.startRandomPick(numbers, {
        gasPrice: 100,
        gasLimit: 9000000
      });
      console.log("Sending...")
      let data = await tx.wait();
      console.log(data);
      return data;
    } catch (err) {
      errors(err);
      throw err;
    }
  }, [contract]);

  const getRandomPick = useCallback(async (tenantId: string) => {
    try {
      const randomPick = await contract.results(tenantId) as Number;

      return randomPick;
    } catch (err) {
      throw err;
    }
  }, [contract]);

  return {
    tenantId,
    contract,
    StartRandomPick: (
      options?: Omit<
        UseMutationOptions<unknown, unknown, void, unknown>,
        "mutationFn"
      >) =>
      useMutation(
        (numbers: Number[]) => startRandomPick(numbers)
      ),
    GetRandomPick: () =>
      useQuery(
        ["getRandomPick", address],
        () => getRandomPick(address!),
        {
          enabled: !!contract?.address,
        }
      )
  };
}

export const RandomPick = createContainer(RandomPickState);

export function useRandomPick() {
  return useContainer(RandomPick);
}
