import {
  Flex,
  Input,
  IconButton,
  Tooltip,
  HStack,
  chakra,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { Diet } from 'core/types'
import { useDietStats } from 'core/stats'
import { useUndoRedoMethods } from 'core/undoRedo'
import StatsLayout from 'components/general/StatsLayout'
import StatValue from 'components/general/StatValue'
import { Info } from 'react-feather'
import RightAligned from 'components/general/RightAligned'
import { List, ArrowUpCircle } from 'react-feather'
import { useRef } from 'react'
import { useElementHeightUpdate } from 'core/ElementHeightProvider'

const ListStyled = chakra(List)
const ArrowUpCircleStyled = chakra(ArrowUpCircle)

type Props = {
  onDietChange: (diet: Diet) => void
  onNewDiet: () => void
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

function NameAndStats({ onDietChange, onNewDiet }: Props) {
  const { register } = useFormContext()
  const dietStats = useDietStats()
  const { saveLastChange } = useUndoRedoMethods()
  const nameRegister = register('name')
  const statsRef = useRef<HTMLDivElement>(null)

  useElementHeightUpdate(statsRef)

  /*function onChangeButtonClick() {
    onDietChange(anotherDiet)
  }
*/
  function onNewButtonClick() {
    onNewDiet()
  }

  function onNameChange(event: any) {
    nameRegister.onChange(event)
    saveLastChange()
  }

  const amountInGrams = dietStats.amountInGrams

  return (
    <Flex pb={3} borderBottomWidth={1} width="100%">
      <Input type="hidden" {...register('formId')} />

      <StatsLayout
        ref={statsRef}
        nameElement={
          <HStack height="100%" alignItems="flex-end" spacing={1}>
            <Input
              {...nameRegister}
              textColor="gray.600"
              autoComplete="off"
              onChange={onNameChange}
            />

            <Tooltip hasArrow label="Browse" aria-label="Browse tooltip">
              <IconButton
                variant="outline"
                aria-label="test"
                onClick={onNewButtonClick}
                icon={<ListStyled color="gray.400" pointerEvents="none" />}
              />
            </Tooltip>
          </HStack>
        }
        energyElement={
          <StatValue
            type="dietEnergy"
            label="Energy"
            value={`${amountInGrams * 10}kcal`}
            valueDetail={
              <Flex alignItems="center">
                <ArrowUpCircleStyled width="15px" height="15px" mr={1} />{' '}
                200kcal
              </Flex>
            }
          />
        }
        proteinElement={
          <StatValue
            type="diet"
            label="Protein"
            value={`${amountInGrams * 2}g`}
            valueDetail="190g"
          />
        }
        carbsElement={
          <StatValue
            type="diet"
            label="Carbs"
            value={`${amountInGrams * 2.5}g`}
            valueDetail="350g"
          />
        }
        fatElement={
          <StatValue
            type="diet"
            label="Fat"
            value={`${amountInGrams * 1.5}g`}
            valueDetail="65g"
          />
        }
        menuElement={
          <RightAligned>
            <IconButton
              aria-label="test"
              icon={<Info color="gray" pointerEvents="none" />}
              variant="ghost"
            />
          </RightAligned>
        }
      />
    </Flex>
  )
}

export default NameAndStats
