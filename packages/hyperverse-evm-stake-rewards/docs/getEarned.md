# Get Earned

<p> The `getEarned` function from `useStakeRewards` returns the amount a spender is allocated to spend. </p>

---

<br>

### getEarned

<p> The `getEarned` function takes in the owner and the spender. </p>

```jsx
	const getEarned = async (account: string) => {
		try {
			const earned = await proxyContract?.earned(account);
			return earned.toNumber();
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
