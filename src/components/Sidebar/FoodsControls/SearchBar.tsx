import {
  Flex,
  Input,
  Tooltip,
  IconButton,
  chakra,
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react'
import { Search, Filter } from 'react-feather'

const SearchStyled = chakra(Search)
const ListStyled = chakra(Filter)

function SearchBar() {
  return (
    <Flex width="100%" pt={3} alignItems="center">
      <InputGroup mr={1}>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchStyled pointerEvents="none" color="gray.400" />}
        />
        <Input type="tel" placeholder="Search by name or category" />
      </InputGroup>

      <Tooltip hasArrow label="Export" aria-label="Export tooltip">
        <IconButton
          variant="outline"
          aria-label="export"
          icon={<ListStyled color="gray.400" pointerEvents="none" />}
        />
      </Tooltip>
    </Flex>
  )
}

export default SearchBar
