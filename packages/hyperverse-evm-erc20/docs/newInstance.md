# New Instance

<p> The `createInstance` function from `useERC20` allows ... </p>

---

<br>

### createInstance

<p> The `createInstance` function takes ... </p>

```jsx
	const createInstance = useCallback(
		async (account: string, name: string, symbol: string, decimal: number) => {
			try {
				const createTxn = await factoryContract.createInstance(
					account,
					name,
					symbol,
					decimal
				);
				return createTxn.wait();
			} catch (err) {
				errors(err);
				throw err;
			}
		},
		[factoryContract?.signer]
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
