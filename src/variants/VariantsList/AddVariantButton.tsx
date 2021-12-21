import { Button, IconButton, ButtonProps } from '@chakra-ui/react'
import { ScreenSize, useScreenSize } from 'general'
import { CalendarPlus } from 'icons'

type Props = {} & ButtonProps

function AddVariantButton({ ...rest }: Props) {
  const screenSize = useScreenSize()

  if (screenSize >= ScreenSize.Medium) {
    return (
      <Button
        borderRadius="full"
        size="md"
        bg="white"
        leftIcon={<CalendarPlus size={16} />}
        variant="outline"
        mr={2}
        flexShrink={0}
        {...rest}
      >
        Add day
      </Button>
    )
  }

  return (
    <IconButton
      aria-label="Add day"
      borderRadius="full"
      size="md"
      bg="white"
      icon={<CalendarPlus size={20} />}
      variant="outline"
      mr={2}
      flexShrink={0}
      {...rest}
    />
  )
}

export default AddVariantButton
