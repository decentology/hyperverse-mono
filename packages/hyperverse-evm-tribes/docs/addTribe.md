# Add Tribe

<p> The `addTribe` function from `useTribes` adds a new tribe. </p>

---

<br>

### addTribe

<p> The `addTribes` function takes in metadata and an image file. </p>

```jsx
	const addTribe = useCallback(
		async (metadata: Omit<MetaData, 'image'>, image: File) => {
			try {
				// TODO: Add progress indicator notices for steps
				// 1. Upload file notification
				// 2. Upload metadata information
				// 3. Success notification

				const { skylink: imageLink } = await uploadFile(image);
				const fullMetaData: MetaData = {
					...metadata,
					image: imageLink.replace('sia:', ''),
				};
				const metadataFile = new File([JSON.stringify(fullMetaData)], 'metadata.json');
				const { skylink: metadataFileLink } = await uploadFile(metadataFile);

				const addTxn = await proxyContract?.addNewTribe(
					metadataFileLink.replace('sia:', '')
				);
				return addTxn.wait();
			} catch (err) {
				throw err;
			}
		},
		[address, proxyContract?.signer]
	);
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
