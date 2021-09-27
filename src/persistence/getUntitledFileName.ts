type Params = {
  prefix?: string
}

function getUntitledFileName({ prefix = 'Untitled' }: Params = {}) {
  const date = new Date()
  const dateString = date.toISOString()

  return `${prefix}-${dateString}`
}

export default getUntitledFileName
