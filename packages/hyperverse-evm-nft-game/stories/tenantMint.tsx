import { useNFTGame } from "../source";
import { useEvm } from "@decentology/hyperverse-evm";
import { useCallback, useRef } from "react";
import "./style.css";

export const TenantMint = ({
  ...props
}: {
  to: string;
  tokenName: string;
  eyeId: number;
  mouthId: number;
  bodyId: number;
}) => {
  const { tenantMint, error } = useNFTGame();
  const { address, Connect } = useEvm();
  const imageRef = useRef(null);

  const uploadFile = useCallback(async () => {
    const resp = await fetch(props.to || imageRef.current.src);
    const blob = await resp.blob();
    const file = new File([blob], "hyperverse-logo.png", { type: "image/png" });
    const result = await tenantMint?.({
      to: props.to,
      tokenName: props.tokenName,
      eyeId: props.eyeId,
      mouthId: props.mouthId,
      bodyId: props.bodyId,
    });
    console.log("Result", result);
  }, [tenantMint]);

  return error != null ? (
    <div>Error</div>
  ) : (
    <>
      <img
        id="hyperverse-logo"
        ref={imageRef}
        style={{ display: "none" }}
        src={require("./assets/hyperverse-logo.png")}
      />
      {address ? (
        <button
          type="button"
          className={["storybook-button", `storybook-button--large`].join(" ")}
          style={{ color: "blue" }}
          onClick={uploadFile}
        >
          Tenant Mint
        </button>
      ) : (
        <Connect />
      )}
    </>
  );
};
