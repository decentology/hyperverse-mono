# Transfer From

<p> The `transferFrom` function from `useERC20` transfers tokens from one address to another. </p>

---

<br>

### transferFrom

<p> The `transferFrom` function takes in an address for the sender, an address for the recipient, and a number of tokens. </p>

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

For more information about our modules please visit: [**Hyperverse Docs**](https://docs.hyperverse.dev)
