const deepCopy = (value: any, replacer?: (key: string, value: any) => any) =>
  JSON.parse(JSON.stringify(value, replacer))

export default deepCopy
