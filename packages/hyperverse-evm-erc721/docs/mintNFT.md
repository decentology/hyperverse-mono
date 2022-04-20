# Mint NFT

<p> The `mintNFT` function from `useERC721` allows a user to create their own NFT. </p>

---

<br>

### mintNFT

<p> The `mintNFT` function takes in a target address. </p>

```jsx
	const mintNFT = async (to: string) => {
		try {
			const mint = await proxyContract?.createNFT(to);
			return mint.wait();
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
