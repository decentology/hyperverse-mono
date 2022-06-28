import { useNFTGame } from "../source";
import { useEvm } from "@decentology/hyperverse-evm";
import "./style.css";

export const NewInstance = ({ ...props }) => {
  const { createInstance } = useNFTGame();
  const { address, Connect } = useEvm();

  return (
    <>
      <Connect />
      <button
        type="button"
        className={["storybook-button", `storybook-button--large`].join(" ")}
        style={{ color: "blue" }}
        onClick={() => {
			console.log('click')
          createInstance?.({ account: address!, name: "token", symbol: "TKN" });
        }}
      >
        New Instance
      </button>
    </>
  );
};
