function getFormPath(
  currentPath: string,
  index?: number,
  fieldName?: string
): string {
  let path = currentPath

  if (index !== undefined) {
    path = `${path}[${index}]`

    if (fieldName !== undefined) {
      path = `${path}.${fieldName}`
    }
  }

  return path
}

export { getFormPath }
