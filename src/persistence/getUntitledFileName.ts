type Params = {
  prefix?: string
}

function getUntitledFileName({ prefix = 'Untitled' }: Params = {}) {
  const date = new Date()
  const dateString = date.toISOString()
  const dateStringParts = dateString.split('.')

  return `${prefix}-${dateStringParts[0]}`
}

export default getUntitledFileName
