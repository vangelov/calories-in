import { cloneElement, ReactElement, Children } from 'react'
import { Button, Divider } from '@chakra-ui/react'
import MenuOrDrawerItem from '../MenuOrDrawerItem'
import MenuOrDrawerSeparator from '../MenuOrDrawerSeparator'

function getDrawerButtons(
  children: ReactElement | ReactElement[],
  onClose: () => void
) {
  return Children.map(children, child => {
    if (child.type === MenuOrDrawerItem) {
      const icon = cloneElement(child.props.icon, {
        size: 20,
      })

      return (
        <Button
          onClick={() => {
            const { onClick } = child.props
            onClick && onClick()
            onClose()
          }}
          isFullWidth={true}
          leftIcon={icon}
          isDisabled={child.props.isDisabled}
        >
          {child.props.children}
        </Button>
      )
    } else if (child.type === MenuOrDrawerSeparator) {
      return <Divider borderColor="gray.400" />
    }

    return null
  })
}

export default getDrawerButtons
