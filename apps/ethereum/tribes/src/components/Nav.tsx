import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useEthereum } from "@decentology/hyperverse-ethereum";

const shortenHash = (
  hash: string = "",
  charLength: number = 6,
  postCharLength?: number
) => {
  let shortendHash;
  if (postCharLength) {
    shortendHash =
      hash.slice(0, charLength) +
      "..." +
      hash.slice(hash.length - postCharLength, hash.length);
  } else {
    shortendHash = hash.slice(0, charLength);
  }
  return shortendHash;
};

const Nav = () => {
  const { address, disconnect, connect } = useEthereum();

  return (
    <nav>
      <Link href="/" passHref>
        <a className={styles.logo}>T</a>
      </Link>
      <div className={styles.rightNav}>
        <Link
          href="https://docs-hyperhack.decentology.com/learn-with-examples"
          passHref
        >
          <a target="_blank" rel="noreferrer">
            About
          </a>
        </Link>

        {!address ? (
          <button className={styles.connect} onClick={connect}>
            Connect Wallet
          </button>
        ) : (
          <button className={styles.logout} onClick={disconnect}>
            <span>{shortenHash(address, 5, 5)}</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
