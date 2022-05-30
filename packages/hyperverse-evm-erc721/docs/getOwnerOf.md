# Get Owner Of

<p> The `getOwnerOf` function from `useERC721` returns the address of a token ID owner. </p>

---

<br>

### getOwnerOf

<p> The `getOwnerOf` function takes in a token ID. </p>

```jsx
	const getOwnerOf = async (tokenId: number) => {
		try {
			console.log("ownerOf:", tokenId);
			const owner = await proxyContract?.ownerOf(tokenId);
			return owner;
		} catch (err) {
			return "0x000";
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

For more information about our modules please visit: [**Hyperverse Docs**](https://docs.hyperverse.dev)
