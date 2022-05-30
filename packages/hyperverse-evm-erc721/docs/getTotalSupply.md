# Get Total Supply

<p> The `getTotalSupply` function from `useERC721` returns the number of tokens the current account has. </p>

---

<br>

### getTotalSupply

```jsx
	const getTotalSupply = async () => {
		try {
			const totalSupply = await proxyContract?.tokenCounter();
			console.log("total supply:", totalSupply.toNumber())
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
