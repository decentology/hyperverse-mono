import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Loader from '../components/Loader';
import { useTribes } from '@decentology/hyperverse-flow-tribes';
import { useFlow } from '@decentology/hyperverse-flow';
import { create } from 'ipfs-http-client';
import { TENANT_ADDRESS } from './shared';

// @ts-ignore
const client = create('https://ipfs.infura.io:5001/api/v0');

const Setup = () => {
	const router = useRouter();
	const { user, authenticate } = useFlow();
	const { createTenant, addTribe } = useTribes();
	const [isLoading, setIsLoading] = useState(false);
	const [loaderMessage, setLoaderMessage] = useState('Processing...');
	const [hash, setHash] = useState<string>();
	const [formInput, updateInput] = useState({
		name: '',
		description: '',
	});

	let uploadToIPFS = async (e) => {
		let file = e.target.files[0];

		const added = await client.add(file);
		setHash(added.path);
	};

	const addATribe = async () => {
		setIsLoading(true);
		setLoaderMessage('Intiating Transaction...');
		await addTribe(formInput.name, hash, formInput.description);
		setIsLoading(false);
	};

	return (
		<main>
			{isLoading ? (
				<Loader loaderMessage={loaderMessage} />
			) : (
				<div className={styles.hero}>
					{user ? (
						<>
							<button
								className={styles.join}
								type="submit"
								onClick={() => createTenant()}
							>
								Create your Tenant
							</button>

							{user.addr &&
							user.addr.toLowerCase() === TENANT_ADDRESS.toLowerCase() ? (
								<div className={styles.container2}>
									<input
										type="text"
										placeholder="Name"
										onChange={(e) =>
											updateInput({ ...formInput, name: e.target.value })
										}
									/>
									<input
										type="file"
										id="tribe-image"
										name="tribe image"
										accept="image/*, .jpg"
										onChange={(e) => uploadToIPFS(e)}
									/>
									<input
										type="text"
										placeholder="Description"
										onChange={(e) =>
											updateInput({
												...formInput,
												description: e.target.value,
											})
										}
									/>
									<button
										className={styles.join}
										type="submit"
										onClick={() => addATribe()}
									>
										Add Tribe
									</button>
								</div>
							) : (
								<div className={styles.container2}>
									<h4 className={styles.error}>
										You are not the owner of this project.
									</h4>
									<h4 className={styles.error}>
										If you are, please use the right tenant address for this
										project. You can change it in /pages/shared.tsx to be the
										address you're logged in to.
									</h4>
								</div>
							)}
						</>
					) : (
						<button className={styles.connect} onClick={() => authenticate()}>
							Connect Wallet
						</button>
					)}
				</div>
			)}
		</main>
	);
};
export default Setup;
