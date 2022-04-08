# Allowance

<p> The `allowance` function from `useERC20` returns the amount a spender is allocated to spend. </p>

---

<br>

### allowance

<p> The `allowance` function takes in the owner and the spender. </p>

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
