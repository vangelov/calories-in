import { DietForm } from 'diets/dietForm'
import { Food } from 'foods/types'
import { Portion } from 'portions/types'
import { StatsTree } from 'stats/calculations'

type Params = {
  dietForm: DietForm
  foodsById: Record<number, Food>
  portionsById: Record<string, Portion>
  dietFormStatsTree: StatsTree
}

export type { Params }
