import { extendTheme } from '@chakra-ui/react'

const Input = {
  defaultProps: {
    focusBorderColor: 'borders.active',
  },
}

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
  colors: {
    borders: {
      active: '#74CFD1',
    },
    foodCategories: {
      redMeat: '#FFC3C3',
      poultry: '#FFEFD8',
      fish: '#D4F6FB',
    },
    text: {
      name: '#4A5568',
    },
  },
  components: {
    Input,
  },
})

export default theme
