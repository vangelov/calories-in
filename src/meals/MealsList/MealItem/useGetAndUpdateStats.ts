import { MealForm } from 'meals'
import { useGetIngredientFormStatsTree } from 'ingredients'
import { getStatsTree, useUpdateMealStats } from 'stats'
import { useMemo } from 'react'

type Params = {
  mealForm: MealForm
  index: number
  selectedVariantFormFieldId: string
}

function useGetAndUpdateStats({
  mealForm,
  index,
  selectedVariantFormFieldId,
}: Params) {
  const getIngredientFormStatsTree = useGetIngredientFormStatsTree()

  const mealFormStatsTree = useMemo(
    () =>
      getStatsTree({
        id: mealForm.fieldId,
        subtrees: mealForm.ingredientsForms.map(ingredientForm =>
          getIngredientFormStatsTree(ingredientForm)
        ),
      }),
    [mealForm.fieldId, mealForm.ingredientsForms, getIngredientFormStatsTree]
  )

  const ingredientsStats = useMemo(
    () => mealFormStatsTree.subtrees.map(({ stats }) => stats),
    [mealFormStatsTree]
  )

  useUpdateMealStats({
    stats: mealFormStatsTree.stats,
    selectedVariantFormFieldId,
    index,
  })

  return {
    ingredientsStats,
    mealFormStatsTree,
  }
}

export default useGetAndUpdateStats
