# Get Decimals

<p> The `getDecimals` function from `useERC777` returns the number of decimals. </p>

---

<br>

### getDecimals

```jsx
	const getDecimals = async () => {
		try {
			const name = await proxyContract?.decimals();
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

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
