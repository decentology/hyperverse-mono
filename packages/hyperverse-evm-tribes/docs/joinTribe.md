# Join Tribe

<p> The `joinTribe` function from `useTribes` joins a tribe. **Tenants may only join one tribe at a time and must leave their current tribe if they wish to join another.** </p>

---

<br>

### joinTribe

```jsx
	const joinTribe = useCallback(
		async (id) => {
			try {
				const joinTxn = await proxyContract?.joinTribe(id);
				return joinTxn.wait();
			} catch (err) {
				throw err;
			}
		},
		[address, proxyContract?.signer]
	);
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
