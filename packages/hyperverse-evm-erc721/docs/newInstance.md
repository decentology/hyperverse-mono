# Create Instance

<p> The `createInstance` function from `useERC721` allows a user to connect their wallet where they can create a new instance. </p>

---

<br>

### createInstance

<p> The `createInstance` function takes in a name for their NFT and a symbol to represent it. </p>

```jsx
	const createInstance = async (name: string, symbol: string) => {
		try {
			console.log("name" + name + "symbol" + symbol)
			const createTxn = await factoryContract.createInstance(name, symbol);
			return createTxn.wait();
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
