# Approve

<p> The `approve` function from `useERC777` approves the address to spend the given amount of token(s) on your behalf. </p>

---

<br>

### approve

<p> The `approve` function takes in the spender and the amount allowed for the transaction. </p>

```jsx
	const approve = useCallback(
		async (spender: string, amount: number) => {
			try {
				const approve = await proxyContract?.approve(spender, amount);
				return approve.wait();
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
