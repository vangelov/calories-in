import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      html: {
        overflow: 'hidden',
      },
      '.js-focus-visible :focus:not([data-focus-visible-added])': {
        outline: 'none',
        'box-shadow:': 'none',
      },
    },
  },
})

export default theme
