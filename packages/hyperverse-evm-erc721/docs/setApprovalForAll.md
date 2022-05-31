# Set Approval for All
<p> The `setApprovalForAll` function from `erc721Library` ... </p>

---

<br>

### setApprovalForAll

<p> The `transfer` function takes in ... </p>

```jsx
  const setApprovalForAll = async ({ to, approved }: { to: string; approved: boolean }) => {
    try {
      const setApprovalTxn = await base.proxyContract?.setApprovalForAll(to, approved);
      return setApprovalTxn.wait() as TransactionReceipt;
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
