import { FoodVolume } from 'foods'

type FoodVolumeForm = {
  portionId: string
  weightInGrams: string
}

function getFoodVolumeForm(foodVolume?: FoodVolume): FoodVolumeForm {
  if (foodVolume) {
    return {
      portionId: foodVolume.portionId,
      weightInGrams: foodVolume.weightInGrams.toString(),
    }
  }

  return {
    portionId: 'milliliters',
    weightInGrams: '',
  }
}

export type { FoodVolumeForm }

export { getFoodVolumeForm }
