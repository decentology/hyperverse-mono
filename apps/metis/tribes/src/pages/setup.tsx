import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Loader from '../components/Loader';
import { useTribes } from '@decentology/hyperverse-evm-tribes';
import { useMetis } from '@decentology/hyperverse-metis';
import { toast } from 'react-toastify';

const Setup = () => {
	const router = useRouter();
	const { address: account, connect } = useMetis();
	const { CheckInstance, NewInstance, AddTribe, tenantId } = useTribes();
	const [isLoadingAddTribe, setIsLoadingAddTribe] = useState(false);
	const [loaderMessage, setLoaderMessage] = useState('Processing...');
	const [imageFile, setImageFile] = useState<File>();
	const [formInput, updateInput] = useState({
		name: '',
		description: '',
	});

	const { data, error: instanceErr } = CheckInstance();
	const { mutate, isLoading: isCreateInstanceLoading, error: newInstanceErr } = NewInstance();
	const isLoading = isLoadingAddTribe || isCreateInstanceLoading;
	const { mutate: addTribe, error: addTribeErr } = AddTribe({
		onSuccess: () => {
			setIsLoadingAddTribe(false);
		},
	});

	const error = instanceErr || newInstanceErr || addTribeErr;
	const addNewTribe = async () => {
		try {
			setIsLoadingAddTribe(true);

			const metadata = {
				name: formInput.name,
				description: formInput.description,
			};

			try {
				setLoaderMessage('Intiating Transaction...');
				// addTribe({metadata: data, image: imageFile});
				addTribe({ metadata, image: imageFile! });
				setLoaderMessage('Processing Transaction...');
			} catch {}
		} catch {}
	};

	useEffect(() => {
		if (error) {
			//@ts-ignore
			toast.error(error.message, {
				position: toast.POSITION.BOTTOM_CENTER,
			});
		}
	}, [error]);

	return (
		<main>
			{isLoading ? (
				<Loader loaderMessage={loaderMessage} />
			) : (
				<div className={styles.hero}>
					{account && !data && (
						<>
							<button className={styles.join} type="submit" onClick={() => mutate()}>
								Create Instance
							</button>
							<p className={styles.error}>
								If you already created an instance, change the Tenant in setup.tsx
								to the signer address.
							</p>
						</>
					)}
					{!account ? (
						<div className={styles.container2}>
							<button className={styles.connect} onClick={() => connect()}>
								Connect Wallet
							</button>
						</div>
					) : account.toLowerCase() === tenantId.toLowerCase() ? (
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
								onChange={(e) => setImageFile(e!.target!.files![0])}
							/>
							<input
								type="text"
								placeholder="Description"
								onChange={(e) =>
									updateInput({ ...formInput, description: e.target.value })
								}
							/>
							<button className={styles.join} type="submit" onClick={addNewTribe}>
								Add Tribe
							</button>
						</div>
					) : (
						<div className={styles.container2}>
							<h4 className={styles.error}>You are not the owner of this project.</h4>
							<h4 className={styles.error}>
								If you are, please use the right tenant address for this project.
							</h4>
						</div>
					)}
					<button
						className={styles.connect}
						type="submit"
						onClick={() => router.push('/')}
					>
						Home
					</button>
				</div>
			)}
		</main>
	);
};
export default Setup;
