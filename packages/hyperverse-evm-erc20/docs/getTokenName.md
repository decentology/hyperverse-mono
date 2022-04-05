# Get Token Name

<p> The `getTokenName` function from `useERC20` allows ... </p>

---

<br>

### getTokenName

<p> The `getTokenName` function takes ... </p>

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
