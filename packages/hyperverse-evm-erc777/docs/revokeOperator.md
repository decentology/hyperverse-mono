
# Revoke Operator

<p> The `revokeOperator` function from `useERC777` removes an account as an operator. </p>

---

<br>

### revoteOperator

<p> The `revokeOperator` function takes in the operator. </p>

```jsx
	const revokeOperator = useCallback(
		async (operator: string) => {
			try {
				const approve = await proxyContract?.revokeOperator(operator);
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
