# Get Balance

<p> The `getBalance` function from `useStakeRewards` returns the amount a spender is allocated to spend. </p>

---

<br>

### getBalance

<p> The `allowance` function takes in the owner and the spender. </p>

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

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
