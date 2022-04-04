# Transfer

<p> The `transfer` function from `useERC721` allows the owner to transfer their NFT to another address. </p>

---

<br>

### transfer

<p> The `transfer` function takes in a ... </p>

```jsx
	const transfer = async (from: string, to: string, tokenId: number) => {
		try {
			const transfer = await proxyContract?.transferFrom(from, to, tokenId);
			return transfer.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	}
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
