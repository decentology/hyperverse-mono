import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
// @ts-ignore
import { useTribes } from '@decentology/hyperverse-flow-tribes'
import { useFlow } from '@decentology/hyperverse-flow';
import styles from '../styles/Home.module.css';
import Nav from '../components/Nav';
import Loader from '../components/Loader';

const TribesPage = () => {
  const router = useRouter();
  const tribes = useTribes();
  const [currentTribe, setCurrentTribe] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState('Processing...');
  const flow = useFlow();

  useEffect(() => {
    if (flow.loggedIn) {
      getMyTribe();
    }
  }, [flow.user])

  const getMyTribe = async () => {
    setIsLoading(true);
    setLoaderMessage("Processing...");
    setCurrentTribe(await tribes.getCurrentTribe(flow.user.addr));
    setIsLoading(false);
  }

  const leaveMyTribe = async () => {
    setIsLoading(true);
    setLoaderMessage("Leaving your tribe. Please wait.");
    await tribes.leaveTribe();
    setIsLoading(false);
    router.push('/all-tribes');
  }

  return (
    <main>
      <Nav />
      {isLoading ? (
        <Loader loaderMessage="Processing..." />
      ) : flow.loggedIn && currentTribe ? (
        <div className={styles.container2}>
          <div className={styles.container3}>
            {currentTribe.ipfsHash === 'N/A' ? (
              <div className={styles.tribeCard}>
                <h2>{currentTribe.name}</h2>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`https://ipfs.infura.io/ipfs/${currentTribe.ipfsHash}/`}
                alt={currentTribe.name}
                className="tribe"
              />
            )}

            <div>
              <h1 className={styles.text}>{currentTribe.name}</h1>
              <p className={styles.description}>{currentTribe.description}</p>
            </div>
          </div>
          <button className={styles.join} onClick={() => leaveMyTribe()}>
            Leave Tribe
          </button>
        </div>
      ) : (
        flow.user && flow.user.addr && (
          <div className={styles.container2}>
            <button
              className={styles.join}
              onClick={() => router.push('/all-tribes')}
            >
              Join a Tribe
            </button>
          </div>
        )
      )}

      {!flow.user || !flow.user.addr
        ?
        <div className={styles.container2}>
          <p className={styles.error}>Connect Wallet to view your tribe</p>
        </div>
        : null}
    </main>
  )
}

export default TribesPage
