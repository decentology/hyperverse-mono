# Create Instance

<p> The `createInstance` function from `useStakeRewards` allows a user to connect their wallet where they can create a new instance. </p>

---

<br>

### createInstance

<p> The `createInstance` function takes in the account, the staking token, the rewards token, and the rewards rate. </p>

```jsx
	const createInstance = useCallback (async (
		account: string,
		stakingToken: string,
		rewardsToken: string,
		rewardRate: number
	) => {
		try {
			const createTxn = await factoryContract.createInstance(
				account,
				stakingToken,
				rewardsToken,
				rewardRate
			);
			return createTxn.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	}, [factoryContract?.signer]);
```

### Stories

```jsx

```

### Main UI Component

```jsx

```

### Args

```jsx

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
