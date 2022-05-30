# Get Total Supply

<p> The `getTotalSupply` function from `useERC20` returns the number of tokens you have. </p>

---

<br>

### getTotalSupply

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

For more information about our modules please visit: [**Hyperverse Docs**](https://docs.hyperverse.dev)
