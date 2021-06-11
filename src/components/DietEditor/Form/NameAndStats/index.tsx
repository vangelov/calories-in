import { Flex, Input, IconButton } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { Diet } from 'core/types'
import { useDietStats } from 'core/stats'
import StatsLayout from 'components/general/StatsLayout'
import { Stat } from 'components/general'
import { Info } from 'react-feather'
import RightAligned from 'components/general/RightAligned'
import Name from './Name'
import EnergyStat from './EnergyStat'

type Props = {
  onDietChange: (diet: Diet) => void
  onNewDiet: () => void
  isEditingExistingDiet: boolean
}

/*const anotherDiet: Diet = {
    id: 2,
    name: 'Another',
    meals: [
      {
        name: 'Meal A',
        ingredients: [{ amountInGrams: 200, foodId: 2 }],
      },
      { name: 'Meal B', ingredients: [{ amountInGrams: 200, foodId: 2 }] },
    ],
    foodsByIdMap: {
      '2': { id: 2, name: 'food2', categoryId: 1 },
    },
  }*/

function NameAndStats({
  onDietChange,
  onNewDiet,
  isEditingExistingDiet,
}: Props) {
  const { register } = useFormContext()
  const dietStats = useDietStats()

  /*function onChangeButtonClick() { 
      onDietChange(anotherDiet)
    }
  */
  function onNewButtonClick() {
    onNewDiet()
  }

  return (
    <Flex
      pb={2}
      borderBottomWidth={1}
      borderBottomColor="gray.100"
      width="100%"
    >
      <Input type="hidden" {...register('formId')} />

      <StatsLayout
        nameElement={<Name onSelectDiet={onNewButtonClick} />}
        energyElement={
          <EnergyStat
            energy={dietStats.energy}
            isEditingExistingDiet={isEditingExistingDiet}
          />
        }
        proteinElement={
          <Stat
            justifyContent="flex-start"
            type="diet"
            label="Protein"
            value={dietStats.protein}
            valueDetail="25%"
            showsValueDetail={true}
          />
        }
        carbsElement={
          <Stat
            justifyContent="flex-start"
            type="diet"
            label="Carbs"
            value={dietStats.carbs}
            valueDetail="55%"
            showsValueDetail={true}
          />
        }
        fatElement={
          <Stat
            justifyContent="flex-start"
            type="diet"
            label="Fat"
            value={dietStats.fat}
            valueDetail="20%"
            showsValueDetail={true}
          />
        }
        menuElement={
          <RightAligned>
            <IconButton
              size="sm"
              mr={3}
              aria-label="test"
              icon={<Info size={20} color="gray" pointerEvents="none" />}
              variant="ghost"
            />
          </RightAligned>
        }
      />
    </Flex>
  )
}

export default NameAndStats
