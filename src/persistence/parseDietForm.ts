import { DietForm } from 'diets'

function getLocation(text: string) {
  const subject = '/Subject'
  const startIndex = text.indexOf('/Subject')
  const endIndex = text.indexOf('R', startIndex)
  const locatioPrefix = text.slice(startIndex + subject.length, endIndex).trim()
  return `${locatioPrefix} obj`
}

function getData(location: string, text: string) {
  const startIndex = text.indexOf(location)
  const endIndex = text.indexOf('endobj', startIndex)
  return text.slice(startIndex + location.length + 2, endIndex - 2)
}

function parseDietForm(text: string) {
  const location = getLocation(text)
  const data = getData(location, text)

  return JSON.parse(data) as DietForm
}

export default parseDietForm
