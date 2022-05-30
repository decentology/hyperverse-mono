# Get Total Supply

<p> The `getTotalSupply` function from `useStakeRewards` returns the number of tokens the current account has. </p>

---

<br>

### getTotalSupply

```jsx
	const getTotalSupply = async () => {
		try {
			const totalSupply = await proxyContract?.totalSupply();
			return totalSupply.toNumber();
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
