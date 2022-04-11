# Get Stake Token

<p> The `getStakeToken` function from `useStakeRewards` returns the amount a spender is allocated to spend. </p>

---

<br>

### getStakeToken

<p> The `getStakeToken` function takes in the owner and the spender. </p>

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

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
