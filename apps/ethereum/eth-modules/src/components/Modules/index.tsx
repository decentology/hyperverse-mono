import { styled } from "../../../stitches.config";
import { MODULES } from "../../consts";
import { ModuleCard } from "./ModuleCard";
export const Modules = () => {
  return (
    <Container>
      <h1> Smart Modules</h1>
      <Grid>
        {MODULES.map((module) => (
          <ModuleCard
            key={module.name}
            name={module.name}
            description={module.description}
            Icon={module.icon}
            path={module.path}
          />
        ))}

      </Grid>
    </Container>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  margin: '50px 0 0',
  
  h1: {
    fontFamily: '$mono',
    fontSize: 24,
    fontWeight: '400',
  }
})

const Grid = styled('div', {
  display: 'grid',
  columnGap: 10,
  gridTemplateColumns: 'repeat(1, 340px)',
  justifyContent: 'center',
  marginTop: 26,
  rowGap: 22,

  '@tablet': {
    columnGap: 40,
    gridTemplateColumns: 'repeat(2, 340px)',
  },

  '@desktop': {
    gridTemplateColumns: 'repeat(3, 340px)',
  },


});
