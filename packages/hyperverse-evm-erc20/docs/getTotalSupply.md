# Get Total Supply

<p> The `getTotalSupply` function from `useERC20` ... </p>

---

<br>

### getTotalSupply

<p> The `getTotalSupply` function takes ... </p>

```jsx
	const getTotalSupply = async () => {
		try {
			const totalSupply = await proxyContract?.totalSupply();
			return BigNumber.from(totalSupply);
		} catch (err) {
			errors(err);
			throw err;
		}
	};
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
