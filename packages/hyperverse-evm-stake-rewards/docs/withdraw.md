# Withdraw

<p> The `withdraw` function from `useStakeRewards` ... </p>

---

<br>

### withdraw

<p> The `withdraw` function takes in an amount of tokens. </p>

```jsx
	const withdraw = useCallback(async (amount: number) => {
		try {
			const withdraw = await proxyContract?.withdraw(amount);
			return withdraw.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	}, [proxyContract?.signer]);
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
