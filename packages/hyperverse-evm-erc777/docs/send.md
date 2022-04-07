
# Send

<p> The `send` function from `useERC777` transfers tokens to an account. </p>

---

<br>

### send

<p> The `send` function takes in the address of the recipient and the amount of tokens being transferred. The transaction will not be reverted in the event of an error. </p>

```jsx
	const send = useCallback(
		async (to: string, value: number, data: string) => {
			try {
				const send = await proxyContract?.send(
					to,
					value,
					ethers.utils.formatBytes32String(data)
				);
				return send.wait();
			} catch (err) {
				if (err instanceof String) {
					if (err.includes('Not enough balance')) {
						throw new Error('Not enough balance');
					}
					errors(err);
				}
				throw err;
			}
		},
		[!!proxyContract?.signer, !!address]
	);
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
