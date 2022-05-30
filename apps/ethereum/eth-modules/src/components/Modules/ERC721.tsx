import { styled } from "../../../stitches.config"
import { ReadFunction } from "./ReadFunction"


export const ERC721 = () => {
  return (
    <ModuleContainer>
    <Heading>Factory Functions</Heading>
      <ReadFunction/>
    </ModuleContainer>
  )}


export const ModuleContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: 24
})

export const Heading = styled("h1", {
  fontFamily: "$mono",
  fontSize: 18,
  fontWeight: "400",
  marginBottom: 20,

})