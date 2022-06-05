import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Loader from '../components/Loader';
import { useTribes } from '@decentology/hyperverse-evm-tribes';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from 'react-query';

const Setup = () => {
	const router = useRouter();
	const { address: account, Connect } = useEthereum();
	// const { CheckInstance, NewInstance, AddTribe, tenantId } = useTribes();
	const tribes = useTribes();
	const [isLoadingAddTribe, setIsLoadingAddTribe] = useState(false);
	const [loaderMessage, setLoaderMessage] = useState('Processing...');
	const [imageFile, setImageFile] = useState<File>();
	const [formInput, updateInput] = useState({
		name: '',
		description: '',
	});

	const { data, error: instanceErr } = useQuery(
		'checkInstance',
		() => tribes.checkInstance!(account),
		{ enabled: !tribes.loading }
	);
	const {
		mutate,
		isLoading: isCreateInstanceLoading,
		error: newInstanceErr,
	} = useMutation('createInstance', tribes.createInstance);
	const isLoading = isLoadingAddTribe || isCreateInstanceLoading;
	const { mutate: addTribe, error: addTribeErr } = useMutation('addTribe', tribes.addTribe, {
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
							<button
								className={styles.join}
								type="submit"
								onClick={() => mutate(account)}
							>
								Create Instance
							</button>
							<p className={styles.error}>
								If you already created an instance, change the `TENANT_ID` in
								./src/pages/_app.tsx to the signer address.
							</p>
						</>
					)}
					{!account ? (
						<div className={styles.container2}>
							<Connect />
						</div>
					) : account.toLowerCase() === tribes.tenantId.toLowerCase() ? (
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
