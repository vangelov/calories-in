import {
  Popover as PopoverBase,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react'
import { useRef } from 'react'
import Content from './Content'
import Trigger from './Trigger'
import Footer from './Footer'

function Popover() {
  const selectRef = useRef<HTMLSelectElement>(null)

  return (
    <PopoverBase placement="left" initialFocusRef={selectRef}>
      {({ onClose }) => {
        return (
          <>
            <PopoverTrigger>
              <Trigger />
            </PopoverTrigger>

            <PopoverContent boxShadow="lg">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Filters</PopoverHeader>

              <PopoverBody>
                <Content selectRef={selectRef} />
              </PopoverBody>

              <PopoverFooter border="0">
                <Footer onClose={onClose} />
              </PopoverFooter>
            </PopoverContent>
          </>
        )
      }}
    </PopoverBase>
  )
}

export default Popover
