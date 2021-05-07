import { Grid, GridItem, Box, GridProps } from '@chakra-ui/react'
import { ForwardedRef, ReactElement, forwardRef } from 'react'

type Props = {
  nameElement: ReactElement
  amountElement?: ReactElement
  energyElement: ReactElement
  proteinElement: ReactElement
  carbsElement: ReactElement
  fatElement: ReactElement
  menuElement: ReactElement
  forwardedRef?: ForwardedRef<HTMLDivElement>
} & GridProps

function StatsLayout({
  nameElement,
  amountElement = <Box />,
  energyElement,
  proteinElement,
  carbsElement,
  fatElement,
  menuElement,
  forwardedRef,
  ...rest
}: Props) {
  return (
    <Grid
      ref={forwardedRef}
      width="100%"
      templateColumns="repeat(10, 1fr)"
      gap={0}
      {...rest}
    >
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

export default forwardRef<HTMLDivElement, Props>((props, ref) => (
  <StatsLayout forwardedRef={ref} {...props} />
))
