# Get Reward

<p> The `getReward` function from `useStakeRewards` returns the amount of tokens awarded to your account. </p>

---

<br>

### getReward

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

For more information about our modules please visit: [**Hyperverse Docs**](https://docs.hyperverse.dev)
