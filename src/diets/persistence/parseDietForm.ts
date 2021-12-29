import { DietForm } from 'diets'
import { fixWhiteSpace } from 'persistence'

function getLocation(text: string) {
  const subject = '/Subject'
  const startIndex = text.indexOf('/Subject')
  const endIndex = text.indexOf('R', startIndex)

  if (startIndex < 0 || endIndex < 0) {
    throw new SyntaxError()
  }
  const locatioPrefix = text.slice(startIndex + subject.length, endIndex).trim()
  return `${locatioPrefix} obj`
}

function getData(location: string, text: string) {
  const startIndex = text.indexOf(location)
  const endIndex = text.indexOf('endobj', startIndex)

  if (startIndex < 0 || endIndex < 0) {
    throw new SyntaxError()
  }

  return text.slice(startIndex + location.length + 2, endIndex - 2)
}

function parseDietForm(text: string) {
  const location = getLocation(text)
  const data = getData(location, text)
  const dietForm = JSON.parse(data, (key: string, value) => {
    if (key === 'notes') {
      return fixWhiteSpace(value)
    }

    return value
  }) as DietForm

  return dietForm
}

export default parseDietForm
