# Get All Tribes

<p> The `getAllTribes` function from `useTribes` returns all tribes... </p>

---

<br>

### useTribeId

```jsx
const getAllTribes = useCallback(async () => {
	try {
		const tribeCount = await proxyContract?.tribeCounter();
		const tribes = [];
		for (let tribeId = 1; tribeId <= tribeCount.toNumber(); ++tribeId) {
			const json = await formatTribeResultFromTribeId(tribeId);
			tribes.push(json);
		}

		return tribes;
	} catch (err) {
		throw err;
	}
}, [address, proxyContract?.address]);
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
