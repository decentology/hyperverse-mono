# Get Balance

<p> The `getBalance` function from `useERC721` returns the available balance of the sender. </p>

---

<br>

### getBalance

```jsx
	const getBalance = async () => {
		try {
			console.log("getBalance:", address);
			const balance = await proxyContract?.balanceOf(address);
			return balance.toNumber();
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
2121