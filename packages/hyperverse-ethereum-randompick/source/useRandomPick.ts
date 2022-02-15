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
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
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
      const tx = await contract.startRandomPick(numbers);
      console.log("Sending...");
      const waited = await tx.wait();
      const event = waited.events.filter((x: any) => (x.event == 'StartedRandomPick'))[0];
      const requestId = event.args[1];
      console.log("RequestId:", requestId);
      return requestId;
    } catch (err) {
      errors(err);
      throw err;
    }
  }, [contract]);

  const getRandomPick = useCallback(async (requestId: string) => {
    console.log("Here");
    return new Promise<Number>(async (resolve, reject) => {

      try {
        console.log(requestId);
        if (!requestId) {
          return null;
        }
        let randomPick = await contract.results(tenantId) as Number;
        console.log(randomPick)
        while (randomPick == 0) {
          await sleep(1000);
          console.log(randomPick);
          randomPick = await contract.results(tenantId) as Number;
        }
        console.log("Random Pick:", randomPick);

        return resolve(randomPick);
      } catch (err) {
        return reject(err);
      }
    });

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
    GetRandomPick: (requestId: string) =>
      useQuery(
        ["getRandomPick"],
        () => getRandomPick(requestId),
        {
          enabled: true,
        }
      )
  };
}

export const RandomPick = createContainer(RandomPickState);

export function useRandomPick() {
  return useContainer(RandomPick);
}
