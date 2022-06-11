# Get Balance Of

<p> The `getBalanceOf` function from `useERC20` returns the amount of tokens owned by another account. </p>

---

<br>

### getBalanceOf

<p> The `getBalanceOf` function takes in the account. </p>

```jsx
	const getBalanceOf = async (account: string) => {
		try {
			const balance = await proxyContract?.balanceOf(account);
			return BigNumber.from(balance);
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
