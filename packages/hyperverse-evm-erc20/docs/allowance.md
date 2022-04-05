# Allowance

<p> The `allowance` function from `useERC20`... </p>

---

<br>

### allowance

<p> The `allowance` function takes ... </p>

```jsx
	const allowance = async (owner: string, spender: string) => {
		try {
			const allowance = await proxyContract?.allowance(owner, spender);
			return BigNumber.from(allowance);
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
