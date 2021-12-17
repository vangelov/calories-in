import { Box, HStack, Button, Divider, Link, BoxProps } from '@chakra-ui/react'

type Props = {
  onAbout: () => void
} & BoxProps

function Footer({ onAbout, ...rest }: Props) {
  return (
    <Box {...rest}>
      <Divider />
      <HStack height="50px" spacing={3}>
        <Button
          variant="link"
          color="gray.500"
          fontWeight="thin"
          py={0.5}
          onClick={onAbout}
        >
          About
        </Button>

        <Link
          color="gray.500"
          target="_blank"
          href="https://www.termsfeed.com/live/7e9b9ec6-aca7-4c99-a987-feb8b535a8e9"
        >
          Terms
        </Link>

        <Link
          color="gray.500"
          target="_blank"
          href="https://www.termsfeed.com/live/ff5061b9-09e0-4fae-a8e9-010274f2085c"
        >
          Disclaimer
        </Link>
      </HStack>
    </Box>
  )
}

export default Footer
