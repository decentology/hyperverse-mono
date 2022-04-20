# Is Operator For

<p> The `isOperatorFor` function from `useERC777` will return true if the account is an operator. </p>

---

<br>

### isOperatorFor

<p> The `isOperatorFor` function takes in the operator and the token holder. </p>

```jsx
	const isOperatorFor = async (operator: string, tokenHolder: string) => {
		try {
			const checkOperator = await proxyContract?.isOperatorFor(operator, tokenHolder);
			return checkOperator;
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
