import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";
import Loader from "../components/Loader";
import { useTribes } from "@decentology/hyperverse-ethereum-tribes";
import { useEthereum } from "@decentology/hyperverse-ethereum";
import Image from "next/image";
import { toast } from 'react-toastify'
import { useEffect } from "react";

const AllTribes = () => {
  const { address } = useEthereum()
  const { Tribes, Join } = useTribes()
  const router = useRouter()
  const { data, isLoading: allTribesLoading } = Tribes()

  const { mutate, isLoading: joinTribeLoading, error } = Join({
    onSuccess: () => router.push('/my-tribe'),
  })

  const isLoading = allTribesLoading || joinTribeLoading

  useEffect(() => {
    if (error) {
      //@ts-ignore
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      })
    }
  }, [error])

  return (
    <main>
      <Nav />
      {isLoading ? (
        <Loader loaderMessage="processing..." />
      ) : (
        <div className={styles.container}>
          <h1>Tribes</h1>
          {address ? (
            !data ? (
              <>
                <h5>There are currently no existing tribes.</h5>
                <a href="/">Go back home</a>
              </>
            ) : (
              <>
                <h5>Select Your Tribe</h5>
                <div className={styles.allTribes}>
                  {data.map((item) => (
                    <div key={item.id} onClick={() => mutate(item.id)}>
                      <Image
                        width={200}
                        height={250}
                        className={styles.cards}
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                  ))}
                </div>
              </>
            )
          ) : (
            <p className={styles.error}>
              Please connect your wallet to join a tribe.
            </p>
          )}
        </div>
      )}
    </main>
  )
}

export default AllTribes
