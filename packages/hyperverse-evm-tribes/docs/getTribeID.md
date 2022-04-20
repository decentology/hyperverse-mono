# Get Tribe Id

<p> The `getTribeId` function from `useTribes` returns the id of a tribe. </p>

---

<br>

### getTribeId

<p> The `getTribeId` function takes in an account. </p>

```jsx
const getTribeId = async (account: string) => {
	try {
		const id = await proxyContract?.getUserTribe(account);
		return id.toNumber();
	} catch (err) {
		if (err instanceof Error) {
			if (err.message.includes('This member is not in a Tribe!')) {
				return null;
			}
		}
	}
};
```

### Stories

```jsx
// Incomplete
```

### Main UI Component

```jsx
// Incomplete
```

### Args

```jsx
// Incomplete
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
