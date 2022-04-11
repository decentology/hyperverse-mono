# Get Proxy

<p> The `getProxy` function from `getStakeRewards` returns the amount a spender is allocated to spend. </p>

---

<br>

### getProxy

<p> The `getProxy` function takes in the owner and the spender. </p>

```jsx
	const getProxy = async (account: string | null) => {
		try {
			const proxyAccount = await factoryContract.getProxy(account);
			return proxyAccount;
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
