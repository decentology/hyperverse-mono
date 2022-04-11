# Get Reward

<p> The `getReward` function from `useStakeRewards` returns the amount a spender is allocated to spend. </p>

---

<br>

### getReward

<p> The `getReward` function takes in the owner and the spender. </p>

```jsx
	const getReward = useCallback(async () => {
		try {
			const getReward = await proxyContract?.getReward();
			return getReward.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	}, [proxyContract?.signer]);
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
