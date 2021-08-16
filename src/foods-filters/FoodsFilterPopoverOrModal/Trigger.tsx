import { Badge } from 'general'
import { IconButton } from '@chakra-ui/react'
import { Filter } from 'react-feather'
import { nonQueryChangesCount, useFoodsFilter } from 'foods-filters'
import { ForwardedRef, forwardRef } from 'react'

type Props = {
  onClick?: () => void
  forwardedRef?: ForwardedRef<HTMLDivElement>
}

function Trigger({ onClick, forwardedRef }: Props) {
  const filter = useFoodsFilter()

  const changesCount = nonQueryChangesCount(filter)

  return (
    <Badge ref={forwardedRef} count={changesCount}>
      <IconButton
        size="md"
        aria-label="Add variant"
        icon={<Filter size={20} pointerEvents="none" />}
        variant="outline"
        onClick={onClick}
      />
    </Badge>
  )
}
export default forwardRef<HTMLDivElement, Props>((props, ref) => (
  <Trigger {...props} forwardedRef={ref} />
))
