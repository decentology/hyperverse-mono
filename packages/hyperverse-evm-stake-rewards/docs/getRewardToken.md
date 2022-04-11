# Get Reward Token

<p> The `getRewardToken` function from `useStakeRewards` returns the amount a spender is allocated to spend. </p>

---

<br>

### getRewardToken

<p> The `getRewardToken` function takes in the owner and the spender. </p>

```jsx
	const getRewardToken = async () => {
		try {
			const rewardToken = await proxyContract?.rewardsToken();
			return rewardToken;
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
