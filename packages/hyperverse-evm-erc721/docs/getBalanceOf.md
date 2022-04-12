# Get Balance Of

<p> The `getBalanceOf` function from `useERC721` returns the available balance of a provided address. </p>

---

<br>

### getBalanceOf

<p> The `getBalanceOf` function takes in an account. </p>

```jsx
	const getBalanceOf = async (account: string) => {
		try {
			console.log("balanceOf:", account);
			const balance = await proxyContract?.balanceOf(account);
			return balance.toNumber();
		} catch (err) {
			errors(err);
			throw err;
		}
	}
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
