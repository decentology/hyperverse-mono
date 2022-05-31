# Toggle Public Mint
<p> The `togglePublicMint` function from `erc721Library` ... </p>

---

<br>

### togglePublicMint

<p> The `togglePublicMint` function takes in ... </p>

```jsx
  const togglePublicMint = async () => {
    try {
      const toggle = await base.proxyContract?.togglePublicMint();
      return toggle.wait() as TransactionReceipt;
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

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
