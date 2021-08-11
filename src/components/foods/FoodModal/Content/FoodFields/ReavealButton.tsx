import { Button, ButtonProps, chakra } from '@chakra-ui/react'
import { ChevronDown, ChevronUp } from 'react-feather'

const ChevronDownStyled = chakra(ChevronDown)
const ChevronUpStyled = chakra(ChevronUp)

type Props = {
  isContentShown: boolean
  showContentLabel: string
  hideContentLabel: string
} & ButtonProps

function RevealButton({
  isContentShown,
  showContentLabel,
  hideContentLabel,
  ...rest
}: Props) {
  return (
    <Button colorScheme="teal" variant="link" {...rest}>
      {isContentShown ? (
        <ChevronUpStyled mr={1} />
      ) : (
        <ChevronDownStyled mr={1} />
      )}
      {isContentShown ? hideContentLabel : showContentLabel}
    </Button>
  )
}

export default RevealButton
