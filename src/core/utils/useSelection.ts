import { useState } from 'react'

type SelectionMap = { [id: number]: boolean | undefined }

function useSelection() {
  const [selectionMap, setSelectionMap] = useState<SelectionMap>({})

  function onToggleId(id: number) {
    setSelectionMap(selectionMap => {
      const isSelected = Boolean(selectionMap[id])
      return { ...selectionMap, [id]: !isSelected }
    })
  }

  function isIdSelected(id: number) {
    const isSelected = Boolean(selectionMap[id])
    return isSelected
  }

  function getSelectedIdsCount() {
    return Object.keys(selectionMap).filter(
      (key: string) => selectionMap[Number(key)] === true
    ).length
  }

  function reset() {
    setSelectionMap({})
  }

  return {
    isIdSelected,
    onToggleId,
    selectionMap,
    getSelectedIdsCount,
    reset,
  }
}

type Selection = ReturnType<typeof useSelection>

export type { Selection }

export default useSelection
