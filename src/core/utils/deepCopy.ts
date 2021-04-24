function deepCopy(value: any) {
  return JSON.parse(JSON.stringify(value))
}

export default deepCopy
