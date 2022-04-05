# Get Balance

<p> The `getBalance` function from `useERC20` allows ... </p>

---

<br>

### getBalance

<p> The `getBalance` function takes ... </p>

```jsx
	const getBalance = async () => {
		try {
			const balance = await proxyContract?.balance();
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
