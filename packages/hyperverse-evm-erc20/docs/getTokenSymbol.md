# Get Token Symbol

<p> The `getTokenSymbol` function from `useERC20` returns the symbol of a token. </p>

---

<br>

### getTokenSymbol

```jsx
	const getTokenSymbol = async () => {
		try {
			const name = await proxyContract?.symbol();
			return name;
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
