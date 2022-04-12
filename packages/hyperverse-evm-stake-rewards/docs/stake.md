# Stake

<p> The `stake` function from `useStakeRewards` stakes an amount of tokens decided by the user. </p>

---

<br>

### stake

<p> The `stake` function takes in the amount of tokens to stake. </p>

```jsx
	const stake = useCallback(async (amount: number) => {
		try {
			const stake = await proxyContract?.stake(amount);
			return stake.wait();
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
