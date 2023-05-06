import { extendTheme } from '@chakra-ui/react'
import styles from './styles'
import colors from './colors'
import { Input, Button, Divider, Textarea, Alert } from './components'

const theme = extendTheme({
  styles,
  colors,
  config: { initialColorMode: 'light', useSystemColorMode: false },
  components: {
    Input,
    Button,
    Divider,
    Textarea,
    Alert,
  },
})

export { default as getComputedColorFromChakra } from './getComputedColorFromChakra'

export default theme
