# Get Stake Token

<p> The `getStakeToken` function from `useStakeRewards` returns the stake token. </p>

---

<br>

### getStakeToken

```jsx
	const getStakeToken = async () => {
		try {
			const stakeToken = await proxyContract?.stakingToken();
			return stakeToken;
		} catch (err) {
			errors(err);
			throw err;
		}
	};
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
