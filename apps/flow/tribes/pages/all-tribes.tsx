import { useState } from "react";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";
import Loader from "../components/Loader";
import { useTribes } from "@decentology/hyperverse-flow-tribes";
import { useFlow } from "@decentology/hyperverse-flow";
import { useEffect } from "react";
import { useRouter } from "next/router";

const AllTribes = () => {
  const [loaderMessage, setLoaderMessage] = useState("Processing...");
  const [isLoading, setIsLoading] = useState(false);
  const [allTribes, setAllTribes] = useState<string[]>([]);
  const tribes = useTribes();
  const flow = useFlow();
  const router = useRouter();

  useEffect(() => {
    getTheTribes();
  }, []);

  const getTheTribes = async () => {
    setIsLoading(true);
    setLoaderMessage("Processing...");
    setAllTribes((await tribes?.getAllTribes()) || []);
    setIsLoading(false);
  };

  const joinATribe = async (itemName: string) => {
    setIsLoading(true);
    setLoaderMessage("Joining a tribe. Please wait.");
    await tribes?.joinTribe(itemName);
    setIsLoading(false);
    router.push("/my-tribe");
  };

  return (
    <main>
      <Nav />
      {isLoading ? (
        <Loader loaderMessage={loaderMessage} />
      ) : (
        <div className={styles.container}>
          <h1>Tribes</h1>
          {flow.loggedIn ? (
            !allTribes ? (
              <div>
                <h5>There are currently no existing tribes.</h5>
                <a href="/">Go back home</a>
              </div>
            ) : (
              <div>
                <h5>Select Your Tribe</h5>
                <div className={styles.allTribes}>
                  {allTribes.map((name, id) => {
                    return (
                      <div key={id} onClick={() => joinATribe(name)}>
                        <img
                          className={styles.cards}
                          src={`https://ipfs.infura.io/ipfs/${name.ipfsHash}/`}
                          alt={name}
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
