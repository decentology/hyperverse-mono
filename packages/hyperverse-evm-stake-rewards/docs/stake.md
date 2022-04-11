# Stake

<p> The `stake` function from `useStakeRewards` returns the amount a spender is allocated to spend. </p>

---

<br>

### stake

<p> The `stake` function takes in the owner and the spender. </p>

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
