import { useState } from "react";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";
import Loader from "../components/Loader";
import { TribesData, useTribes } from "@decentology/hyperverse-flow-tribes";
import { useFlow } from "@decentology/hyperverse-flow";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import Image from "next/image";

const AllTribes = () => {
  const [loaderMessage, setLoaderMessage] = useState("Processing...");
  const [isLoading, setIsLoading] = useState(false);
  const [allTribes, setAllTribes] = useState<TribesData[]>([]);
  const tribes = useTribes();
  const flow = useFlow();
  const router = useRouter();

  const getTheTribes = useCallback(async () => {
    setIsLoading(true);
    setLoaderMessage("Processing...");
    setAllTribes((await tribes?.getAllTribes()) || []);
    setIsLoading(false);
  }, [setAllTribes, setIsLoading, setLoaderMessage, tribes]);

  const joinATribe = useCallback(
    async (itemName: string) => {
      setIsLoading(true);
      setLoaderMessage("Joining a tribe. Please wait.");
      await tribes?.joinTribe(itemName);
      router.push("/my-tribe");
      setIsLoading(false);
    },
    [router, setIsLoading, setLoaderMessage, tribes]
  );

  useEffect(() => {
    getTheTribes();
  }, [getTheTribes]);
  return (
    <main>
      <Nav />
      {isLoading ? (
        <Loader loaderMessage={loaderMessage} />
      ) : (
        <div className={styles.container}>
          <h1>Tribes</h1>
          {flow?.loggedIn ? (
            !allTribes ? (
              <div>
                <h5>There are currently no existing tribes.</h5>
                <a href="/">Go back home</a>
              </div>
            ) : (
              <div>
                <h5>Select Your Tribe</h5>
                <div className={styles.allTribes}>
                  {allTribes.map((tribe, id) => {
                    return (
                      <div key={id} onClick={() => joinATribe(tribe.name)}>
                        <Image
                          width={240}
                          height={300}
                          className={styles.cards}
                          src={`https://ipfs.infura.io/ipfs/${tribe.ipfsHash}/`}
                          alt={tribe.name}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          ) : (
            <p className={styles.error}>
              Please connect your wallet to join a tribe.
            </p>
          )}
        </div>
      )}
    </main>
  );
};

export default AllTribes;
