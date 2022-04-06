# Transfer

<p> The `transfer` function from `useERC20` allows the owner to transfer their token to another address. </p>

---

<br>

### transfer

<p> The `transfer` function takes in the address of the recipient and the value of the token being transferred. </p>

```jsx

	const transfer = useCallback(async (to: string, value: number) => {
		try {
			const transfer = await proxyContract?.transfer(to, value, {gasLimit: 1000000});
			return transfer.wait();
		} catch (err) {
			if (err instanceof String) {
				if (err.includes('Not enough balance')) {
					throw new Error('Not enough balance');
				}
				errors(err);
			}
			throw err;
		}
	}, [!!proxyContract?.signer, !!address]);
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
