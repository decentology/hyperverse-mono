# Authorize Operator

<p> The `authorizeOperator` function from `useERC777` makes an account an operator. </p>

---

<br>

### authorizeOperator

<p> The `authorizeOperator` function takes in the operator. </p>

```jsx
	const authorizeOperator = useCallback(
		async (operator: string) => {
			try {
				const approve = await proxyContract?.authorizeOperator(operator);
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

For more information about our modules please visit: [**Hyperverse Docs**](https://docs.hyperverse.dev)
