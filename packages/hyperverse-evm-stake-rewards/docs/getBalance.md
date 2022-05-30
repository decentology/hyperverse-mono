# Get Balance

<p> The `getBalance` function from `useStakeRewards` returns the amount of tokens owned by the current account. </p>

---

<br>

### getBalance

```jsx
	const getBalance = async () => {
		try {
			const balance = await proxyContract?.balance();
			return balance.toNumber();
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
