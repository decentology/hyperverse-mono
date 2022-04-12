# Get Reward Token

<p> The `getRewardToken` function from `useStakeRewards` returns the reward token. </p>

---

<br>

### getRewardToken

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
