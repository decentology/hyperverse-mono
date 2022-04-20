# Leave Tribe

<p> The `leaveTribe` function from `useTribes` leaves a tribe. </p>

---

<br>

### leaveTribe

```jsx
	const leaveTribe = useCallback(async () => {
		try {
			const leaveTxn = await proxyContract?.leaveTribe();
			await leaveTxn.wait();
			return leaveTxn.hash;
		} catch (err) {
			throw err;
		}
	}, [address, proxyContract?.signer]);
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
