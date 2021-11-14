import { Food } from 'foods'
import { useEffect, useState } from 'react'
import { TabName } from './Tabs'

type Params = {
  food?: Food
  isEditing: boolean
}

function getTabNames(isEditing: boolean, food?: Food): TabName[] {
  if (isEditing) {
    return ['nutrition', 'volume', 'link']
  }

  const result: TabName[] = ['nutrition']

  if (food?.volume) {
    result.push('volume')
  }

  if (food?.url) {
    result.push('link')
  }

  return result
}

function useTabs({ food, isEditing }: Params) {
  const [selectedTabName, setSelectedTabName] = useState<TabName>('nutrition')

  function onTabNameChange(newTabName: TabName) {
    setSelectedTabName(newTabName)
  }

  const tabNames = getTabNames(isEditing, food)

  useEffect(() => {
    if (!tabNames.includes(selectedTabName)) {
      setSelectedTabName('nutrition')
    }
  }, [food, isEditing, selectedTabName, tabNames])

  return {
    onTabNameChange,
    selectedTabName,
    tabNames,
  }
}

export default useTabs
