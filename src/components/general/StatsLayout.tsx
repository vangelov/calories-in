import { Grid, GridItem, Box, GridProps } from '@chakra-ui/react'
import { useScreenSize } from 'components/general/ScreenSizeProvider'
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
  prefersAmount?: boolean
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
  prefersAmount = false,
  ...rest
}: Props) {
  const screenSize = useScreenSize()

  if (screenSize >= 2) {
    return (
      <Grid
        ref={forwardedRef}
        width="100%"
        gap={0}
        templateColumns="repeat(10, 1fr)"
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

  if (screenSize === 1) {
    return (
      <Grid
        ref={forwardedRef}
        width="100%"
        templateColumns="repeat(10, 1fr)"
        gap={0}
        {...rest}
      >
        <GridItem colSpan={4}>{nameElement}</GridItem>
        <GridItem colSpan={2}>{amountElement}</GridItem>
        <GridItem colSpan={2}>{energyElement}</GridItem>
        <GridItem colSpan={2}>{menuElement}</GridItem>
      </Grid>
    )
  }

  return (
    <Grid
      ref={forwardedRef}
      width="100%"
      templateColumns="repeat(10, 1fr)"
      gap={0}
      {...rest}
    >
      <GridItem colSpan={5}>{nameElement}</GridItem>
      <GridItem colSpan={3}>
        {prefersAmount ? amountElement : energyElement}
      </GridItem>
      <GridItem colSpan={2}>{menuElement}</GridItem>
    </Grid>
  )
}

export default forwardRef<HTMLDivElement, Props>((props, ref) => (
  <StatsLayout forwardedRef={ref} {...props} />
))
