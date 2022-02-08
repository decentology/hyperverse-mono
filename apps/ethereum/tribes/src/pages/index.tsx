import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";
import { useTribes } from "@decentology/hyperverse-ethereum-tribes";
import { useEthereum } from "@decentology/hyperverse-ethereum";
import { toast } from "react-toastify";


const Home: NextPage = () => {
  const router = useRouter();
  const { address } = useEthereum();
  const { TribeId } = useTribes();
  const { data, error } = TribeId();


  useEffect(() => {
       //@ts-ignore
    if (error) {
         //@ts-ignore
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      })
    }
  }, [error])
  return (
    <>
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
            <h1> Tribes</h1>
            {address ? (
              !data ? (
                <button
                  className={styles.join}
                  onClick={() => {
                    router.push("/all-tribes");
                  }}
                >
                  Join A Tribe
                </button>
              ) : (
                <button
                  className={styles.join}
                  onClick={() => router.push("/my-tribe")}
                >
                  View Your Tribe
                </button>
              )
            ) : null}
          </div>
        </div>
        {/* <Footer /> */}
      </main>
    </>
  );
};

export default Home;
