# Approve

<p> The `approve` function from `erc721Library` sets ... </p>

---

<br>

### approve

<p> The `approve` function takes in ... </p>

```jsx
  const approve = async ({ to, tokenId }: { to: string; tokenId: number }) => {
    try {
      const approveTxn = await base.proxyContract?.approve(to, tokenId);
      return approveTxn.wait() as TransactionReceipt;
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
