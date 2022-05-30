import { styled } from "../../../stitches.config";
import { PlaygroundTab } from "./PlaygroundTab";
import { PlaygroundBody } from "./PlaygroundBody";
export const Playground = () => {
  return (
    <>
      <Container>
        <PlaygroundTab />
        <PlaygroundBody />



      </Container>
    </>
  );
}

const Container = styled("div", {
  display: "flex",
  marginTop: 40,
})

