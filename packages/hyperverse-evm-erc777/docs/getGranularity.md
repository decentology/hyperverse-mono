# Get Granularity

<p> The `getGranularity` function from `useERC777` returns the smallest part of the token that is not divisible. </p>

---

<br>

### getGranularity

```jsx
	const getGranularity = async () => {
		try {
			const name = await proxyContract?.granularity();
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
