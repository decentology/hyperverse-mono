
# Operator Send

<p> The `operatorSend` function from `useERC777` allows an operator to transfer tokens to an account. </p>

---

<br>

### operatorSend

<p> The `operatorSend` function takes in the address of the sender, the address of the recipient, the amount of tokens being transferred, and the operator's data. </p>

```jsx
	const operatorSend = useCallback(
		async (
			sender: string,
			recipient: string,
			value: number,
			data: string,
			operatorData: string
		) => {
			try {
				const send = await proxyContract?.operatorSend(
					sender,
					recipient,
					value,
					ethers.utils.formatBytes32String(data),
					ethers.utils.formatBytes32String(operatorData)
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
