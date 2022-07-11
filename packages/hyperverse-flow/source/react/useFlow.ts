import { useState, useEffect } from 'react';
import { createContainer } from '@decentology/unstated-next';
import { Blockchain, useHyperverse } from '@decentology/hyperverse/react';
import { FlowUser } from '../types';
import { useAsync } from 'react-async-hook';
import { Initialize } from '../context/initialize';
import sendFlow from '../context/sendFlow';
import fetchBalance from '../context/fetchBalance';
const fcl = require('@onflow/fcl');
const t = require('@onflow/types');
function FlowState() {
	const { blockchain, network } = useHyperverse();
	const [user, setUser] = useState<FlowUser>(null);
	const [find, setFind] = useState<string>('');

	const { result: { client, explorer } = {}, status, error, loading } = useAsync(
		Initialize,
		[network],
		{
			initialState: () => {
				return {
					error: undefined,
					loading: true,
					status: 'loading',
					result: {
						client: null,
						explorer: null
					}
				};
			}
		}
	);

	const isInitialized = user !== null;

	const loggedIn = !!user?.loggedIn;

	const authenticate = async () => {
		fcl.authenticate();
	};

	const unauthenticate = async () => {
		fcl.unauthenticate();
	};

	const resolveFind = async () => {
		if (user && user.addr) {
			const result = await fcl.send([
				fcl.script`
				import FIND from 0xa16ab1d0abde3625
	
				pub fun main(address: Address) :  String? {
					return FIND.reverseLookup(address)
				}
				`,
				fcl.args([
					fcl.arg(user.addr, t.Address)
				])
			]).then(fcl.decode);
			console.log(result);
			setFind(result);
		}
	}

	useEffect(() => {
		fcl.currentUser().subscribe(setUser);
	}, []);

	useEffect(() => {
		console.log(user);
		resolveFind();
	}, [user])

	useEffect(() => {
		if (blockchain?.name !== Blockchain.Flow) {
			unauthenticate();
		}
	}, [blockchain?.name]);

	return {
		user,
		find,
		isInitialized,
		authenticate,
		unauthenticate,
		fetchBalance,
		sendFlow,
		client,
		explorer,
		loggedIn
	};
}

const FlowContainer = createContainer(FlowState);
export const Provider = FlowContainer.Provider;

export function useFlow() {
	return FlowContainer.useContainer();
}
