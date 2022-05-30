# Reward Per Token

<p> The `rewardPerToken` function from `useStakeRewards` calculates the rate of reward. </p>

---

<br>

### rewardPerToken

```jsx
	const rewardPerToken = async () => {
		try {
			const reward = await proxyContract?.rewardPerToken();
			return reward.toNumber();
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
