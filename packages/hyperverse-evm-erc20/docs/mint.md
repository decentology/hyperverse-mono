# Mint

<p> The `mint` function from `useERC720` allows a user to mint a new token. </p>

---

<br>

### mint

<p> The `mint` function takes in an amount of tokens to mint. </p>

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
