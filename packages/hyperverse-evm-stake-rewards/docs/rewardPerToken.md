# Reward Per Token

<p> The `rewardPerToken` function from `useStakeRewards` returns the amount a spender is allocated to spend. </p>

---

<br>

### rewardPerToken

<p> The `rewardPerToken` function takes in the owner and the spender. </p>

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

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
