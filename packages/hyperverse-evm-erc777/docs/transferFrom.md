# Transfer From

<p> The `transferFrom` function from `useERC777` allows a user to transfer tokens from one account to another. </p>

---

<br>

### transferFrom

<p> The `transferFrom` function takes in two accounts (a sender and a receiver) and the amount to be transferred. </p>

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
