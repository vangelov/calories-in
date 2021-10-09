import { extendTheme } from '@chakra-ui/react'
import styles from './styles'
import colors from './colors'
import { Input, Button, Divider } from './components'

const theme = extendTheme({
  styles,
  colors,
  components: {
    Input,
    Button,
    Divider,
  },
})

export { default as getComputedColorFromChakra } from './getComputedColorFromChakra'

export default theme
