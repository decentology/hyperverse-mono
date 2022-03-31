# Get Tribe

<p> The `getTribe` function from `useTribes` returns the name of a tribe. </p>

---

<br>

### useTribeId

```jsx
const getTribe = async (id: number) => {
	try {
		await proxyContract?.getTribeData(id);
		return formatTribeResultFromTribeId(id);
	} catch (err) {
		throw err;
	}
};
```

### Stories

```jsx
// Incomplete
```

### Main UI Component

```jsx
// Incomplete
```

### Args

```jsx
// Incomplete
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
