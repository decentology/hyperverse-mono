# Supports Interface

<p> The `supportsInterface` function from `nftGameLibrary` ... </p>

---

<br>

### supportsInterface

<p> The `supportsInterface` function takes . </p>

```jsx
	const supportsInterface = async (interfaceId: string) => { 
		try {
			const supportsInterface = await base.proxyContract?.supportsInterface(interfaceId);
			return supportsInterface;
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
import { useNFTGame } from '../source/react';
import { useEffect, useState } from 'react';

export const SupportsInterface = ({ ...props }: { interfaceId: string }) => {
	const nftGame = useNFTGame();
	const [data, setData] = useState();

	useEffect(() => {
		if (nftGame.supportsInterface) {
			nftGame.supportsInterface(props.interfaceId).then(setData);
		}
	}, [nftGame.supportsInterface]);

	const interfaceCheck = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(nftGame.error)}</p>;
	};

	return <div className="body"> Supports Interface: {interfaceCheck()}</div>;
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
