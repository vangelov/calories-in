import { extendTheme } from '@chakra-ui/react'
import styles from './styles'
import colors from './colors'
import { Input, Button } from './components'

const theme = extendTheme({
  styles,
  colors,
  components: {
    Input,
    Button,
  },
})

export default theme
