# Get Token Name

<p> The `getTokenName` function from `useERC20` returns the name of a token. </p>

---

<br>

### getTokenName

```jsx
	const getTokenName = async () => {
		try {
			const name = await proxyContract?.name();
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
