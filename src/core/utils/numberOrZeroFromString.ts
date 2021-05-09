function numberOrZeroFromString(value: string): number {
  const result = Number(value)

  if (isNaN(result)) {
    return 0
  }

  return result
}

export default numberOrZeroFromString
