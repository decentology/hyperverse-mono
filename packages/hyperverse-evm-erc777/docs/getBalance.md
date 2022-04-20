# Get Balance

<p> The `getBalance` function from `useERC777` returns the available balance of the sender. </p>

---

<br>

### getBalance

```jsx
	const getBalance = async () => {
		try {
			const balance = await proxyContract?.balance(address);
			return BigNumber.from(balance);
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
