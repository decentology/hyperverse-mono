# Get Owner Of

<p> The `getOwnerOf` function from `useERC721` returns the address of a token ID owner. </p>

---

<br>

### getOwnerOf

<p> The `getOwnerOf` function takes in a token ID. </p>

```jsx
  const getOwnerOf = async (tokenId: string) => {
    try {
      const owner = await base.proxyContract?.ownerOf(tokenId);
      return owner;
    } catch (error) {
      throw error;
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
