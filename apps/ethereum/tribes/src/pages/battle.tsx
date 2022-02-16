import { useRandomPick } from "@decentology/hyperverse-ethereum-randompick";
import Image from "next/image";
import Nav from "../components/Nav";
import styles from "../styles/Home.module.css";
const Battle = () => {
    
  const { StartRandomPick, GetRandomPick } = useRandomPick();
  const { mutate: randomMutate, data: resultData } = StartRandomPick();
  let { data: randomNumberPick } = GetRandomPick(resultData);
  return (
    <main>
      <Nav />
      <div className={styles.hero}>
        <div className={styles.header}>Tribes Battle Royal</div>
        <div className={styles.battleStage}>
          <div>
            <Image
              src="https://fileportal.org/PAG841uuWQO-i2LC1g0Fn8WjVgkkSvdRgg7GSznlyK3XbQ"
              width={256}
              height={256}
            />
          </div>
          <div>
            <Image
              src="https://fileportal.org/PADZ7g9nXdC-shhMqTGzeq8dQR7WUl7yd94D5BX8rD-YfQ"
              width={256}
              height={256}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
export default Battle;
