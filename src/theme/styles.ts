const styles = {
  global: {
    body: {
      overflowX: 'hidden',
      fontFamily: 'Roboto',
      background: 'gray.50',
    },
    '.js-focus-visible :focus:not([data-focus-visible-added])': {
      outline: 'none',
      'box-shadow:': 'none',
    },
    '.rc-menu__item--hover': {
      'background-color': '#EDF2F7',
    },
    '.rc-menu__item--active': {
      color: 'black',
      'background-color': '#E2E8F0',
    },
  },
}

export default styles
