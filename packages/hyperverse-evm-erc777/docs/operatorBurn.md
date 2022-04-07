
# Operator Burn

<p> The `operatorBurn` function from `useERC777` allows an operator to remove a token from circulation. </p>

---

<br>

### operatorBurn

<p> The `operatorBurn` function takes in a target account, the amount of tokens to remove, and the operator's data. </p>

```jsx
	const operatorBurn = useCallback(
		async (account: string, value: number, data: string, operatorData: string) => {
			try {
				const burn = await proxyContract?.operatorBurn(
					account,
					value,
					ethers.utils.formatBytes32String(data),
					ethers.utils.formatBytes32String(operatorData)
				);
				return burn.wait();
			} catch (err) {
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
