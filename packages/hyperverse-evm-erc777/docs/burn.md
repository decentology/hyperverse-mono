# Burn

<p> The `burn` function from `useERC777` allows a user to remove a token from circulation. </p>

---

<br>

### burn

<p> The `burn` function takes in an amount of tokens to remove. </p>

```jsx
	const burn = async (amount: number, data: string) => {
		try {
			const burn = await proxyContract?.burn(amount, ethers.utils.formatBytes32String(data));
			return burn.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	};
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
