import { Grid, GridItem, Box } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

type Props = {
  nameElement: ReactElement
  amountElement?: ReactElement
  energyElement: ReactElement
  proteinElement: ReactElement
  carbsElement: ReactElement
  fatElement: ReactElement
  menuElement: ReactElement
}
function StatsLayout({
  nameElement,
  amountElement = <Box />,
  energyElement,
  proteinElement,
  carbsElement,
  fatElement,
  menuElement,
}: Props) {
  return (
    <Grid width="100%" templateColumns="repeat(10, 1fr)" gap={1}>
      <GridItem colSpan={4}>{nameElement}</GridItem>
      <GridItem colSpan={1}>{amountElement}</GridItem>
      <GridItem colSpan={1}>{energyElement}</GridItem>
      <GridItem colSpan={1}>{proteinElement}</GridItem>
      <GridItem colSpan={1}>{carbsElement}</GridItem>
      <GridItem colSpan={1}>{fatElement}</GridItem>
      <GridItem colSpan={1}>{menuElement}</GridItem>
    </Grid>
  )
}

export default StatsLayout
