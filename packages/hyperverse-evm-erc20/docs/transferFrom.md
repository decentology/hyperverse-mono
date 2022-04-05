# Transfer From

<p> The `transferFrom` function from `useERC20` ... </p>

---

<br>

### transferFrom

<p> The `transferFrom` function takes ... </p>

```jsx
	const transferFrom = useCallback(
		async (from: string, to: string, value: number) => {
			try {
				const transfer = await proxyContract?.transferFrom(from, to, value);
				return transfer.wait();
			} catch (err) {
				errors(err);
				throw err;
			}
		},
		[address]
	);
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
