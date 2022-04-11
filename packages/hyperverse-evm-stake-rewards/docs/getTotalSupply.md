# Get Total Supply

<p> The `getTotalSupply` function from `useStakeRewards` returns the amount a spender is allocated to spend. </p>

---

<br>

### getTotalSupply

<p> The `getTotalSupply` function takes in the owner and the spender. </p>

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

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
