# Get Tribe

<p> The `getTribe` function from `useTribes` returns a tribe's data. </p>

---

<br>

### getTribe

<p> The `getTribe` function takes in an Id. </p>

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
