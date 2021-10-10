import { useState } from 'react'

type Id = number | string
type Item = { id: Id }
type SelectionMap = { [id in Id]: boolean | undefined }

type Selection<T extends Item> = {
  isIdSelected: (id: Id) => boolean
  toggleItem: (item: T) => void
  addItem: (item: T) => void
  removeItem: (item: T) => void
  selectedItems: T[]
  selectionMap: SelectionMap
}

function useSelection<T extends Item>(): Selection<T> {
  const [selectionMap, setSelectionMap] = useState<SelectionMap>({})
  const [selectedItems, setSelectedItems] = useState<T[]>([])

  function toggleItem(item: T) {
    const { id } = item
    const isSelected = Boolean(selectionMap[id])

    if (isSelected) {
      removeItem(item)
    } else {
      addItem(item)
    }

    setSelectionMap({ ...selectionMap, [id]: !isSelected })
  }

  function removeItem(item: T) {
    setSelectedItems(selectedItems.filter(({ id }) => item.id !== id))
  }

  function addItem(item: T) {
    setSelectedItems([...selectedItems, item])
  }

  function isIdSelected(id: Id) {
    const isSelected = Boolean(selectionMap[id])
    return isSelected
  }

  return {
    isIdSelected,
    toggleItem,
    selectionMap,
    selectedItems,
    removeItem,
    addItem,
  }
}

export type { Selection, Item }

export default useSelection
