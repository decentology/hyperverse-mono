# Create Instance

<p> The `createInstance` function from `useStakeRewards` returns the amount a spender is allocated to spend. </p>

---

<br>

### createInstance

<p> The `createInstance` function takes in the owner and the spender. </p>

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
