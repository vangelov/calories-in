import { Text } from '@chakra-ui/react'

type Props = {
  command: string
  kbdCombo: string
}

function TooltipCommandLabel({ command, kbdCombo }: Props) {
  return (
    <Text py={2}>
      {command}{' '}
      <Text p={1} bg="gray.600" as="span" borderRadius={2}>
        {kbdCombo}
      </Text>
    </Text>
  )
}

export default TooltipCommandLabel
