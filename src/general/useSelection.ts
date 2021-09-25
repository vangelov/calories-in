import { useState } from 'react'

type Id = number | string
type Item = { id: Id }
type SelectionMap = { [id in Id]: boolean | undefined }

type Selection<T extends Item> = {
  isIdSelected: (id: Id) => boolean
  onToggleItem: (item: T) => void
  selectedItems: T[]
  selectionMap: SelectionMap
}

function useSelection<T extends Item>(): Selection<T> {
  const [selectionMap, setSelectionMap] = useState<SelectionMap>({})
  const [selectedItems, setSelectedItems] = useState<T[]>([])

  function onToggleItem(item: T) {
    const { id } = item
    const isSelected = Boolean(selectionMap[id])

    if (isSelected) {
      setSelectedItems(selectedItems.filter(({ id }) => item.id !== id))
    } else {
      setSelectedItems([...selectedItems, item])
    }
    setSelectionMap({ ...selectionMap, [id]: !isSelected })
  }

  function isIdSelected(id: Id) {
    const isSelected = Boolean(selectionMap[id])
    return isSelected
  }

  return {
    isIdSelected,
    onToggleItem,
    selectionMap,
    selectedItems,
  }
}

export type { Selection, Item }

export default useSelection
