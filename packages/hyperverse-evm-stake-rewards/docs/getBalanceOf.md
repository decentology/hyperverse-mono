# Get Balance Of

<p> The `getBalanceOf` function from `useStakeRewards` returns the amount a spender is allocated to spend. </p>

---

<br>

### getBalanceOf

<p> The `getBalanceOf` function takes in the owner and the spender. </p>

```jsx
	const getBalanceOf = async (account: string) => {
		try {
			const balance = await proxyContract?.balanceOf(account);
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
