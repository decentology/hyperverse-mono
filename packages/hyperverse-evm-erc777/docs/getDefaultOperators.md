# Get Default Operators

<p> The `getDefaultOperators` function from `useERC777` returns a list of default operators. </p>

---

<br>

### getDefaultOperators

```jsx
	const getDefaultOperators = async () => {
		try {
			const defaultOperator = await proxyContract?.defaultOperators();
			return defaultOperator;
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
