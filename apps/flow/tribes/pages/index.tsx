import type { NextPage } from "next";
import { useState, useEffect } from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";
import { useFlow } from '@decentology/hyperverse-flow'
import { useTribes } from "@decentology/hyperverse-flow-tribes";

const Home: NextPage = () => {
  const [currentTribe, setCurrentTribe] = useState(null);
  const router = useRouter();
  const tribes = useTribes();
  const flow = useFlow();

  useEffect(() => {
    if (flow.loggedIn) {
      getUserTribe();
    }
  }, [flow.user])

  const getUserTribe = async () => {
    setCurrentTribe(await tribes.getCurrentTribe(flow.user.addr));
  }

  return (
    <div>
      <Head>
        <title>Tribes Sample Project</title>
        <meta
          name="description"
          content="Sample project utilizing tribes module from hyperverse"
        />
      </Head>

      <main>
        <Nav />
        <div className={styles.hero}>
          <div className={styles.header}>
            <h1>Tribes</h1>
            {flow.loggedIn ? (
              !currentTribe
                ?
                <button
                  className={styles.join}
                  onClick={() => {
                    router.push('/all-tribes')
                  }}
                >
                  Join A Tribe
                </button>
                :
                <button className={styles.join} onClick={() => router.push('/my-tribe')}>
                  View Your Tribe
                </button>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
