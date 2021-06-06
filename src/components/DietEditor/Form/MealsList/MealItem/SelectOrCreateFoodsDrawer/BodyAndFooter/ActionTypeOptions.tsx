import { Tabs, TabList, Tab } from '@chakra-ui/react'

type ActionType = 'selectFoods' | 'createNewFood'

type Props = {
  actionType: ActionType
  onActionChange: (actionType: ActionType) => void
}

const tabIndexToActionTypeMap: Record<number, ActionType> = {
  0: 'selectFoods',
  1: 'createNewFood',
}

const actionTypeToTabIndexMap: Record<ActionType, number> = {
  selectFoods: 0,
  createNewFood: 1,
}

function ActionTypeOptions({ onActionChange, actionType }: Props) {
  function onTabChange(selectedTabIndex: number) {
    const actionType = tabIndexToActionTypeMap[selectedTabIndex]
    onActionChange(actionType)
  }

  const tabIndex = actionTypeToTabIndexMap[actionType]

  return (
    <Tabs
      colorScheme="custom"
      isFitted={true}
      onChange={onTabChange}
      index={tabIndex}
    >
      <TabList>
        <Tab>Select Foods</Tab>
        <Tab>Create New Food</Tab>
      </TabList>
    </Tabs>
  )
}

export type { ActionType }

export default ActionTypeOptions
