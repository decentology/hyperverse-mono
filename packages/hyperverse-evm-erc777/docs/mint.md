# Mint

<p> The `mint` function from `useERC777` allows a user to mint a new token. </p>

---

<br>

### mint

<p> The `mint` function takes an amount to represent the total supply. </p>

```jsx
	const mint = async (amount: number) => {
		try {
			const mint = await proxyContract?.mint(amount);
			return mint.wait();
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
