import { usePortions } from 'portions'

type PortionsType = 'all' | 'weightBased' | 'volumeBased'

function usePortionsForType(type: PortionsType) {
  const {
    allPortions,
    weightBasedPortions,
    volumeBasedPortions,
  } = usePortions()

  return type === 'all'
    ? allPortions
    : type === 'weightBased'
    ? weightBasedPortions
    : volumeBasedPortions
}

export type { PortionsType }

export default usePortionsForType
