import { Form } from './types'

function getDuplicatedName(index: number, forms: Form[]) {
  const form = forms[index]
  const originalNameOrUntitled = form.name || 'Untitled'
  return getEnumeratedName(`Copy of ${originalNameOrUntitled}`, forms)
}

function getEnumeratedName(currentName: string, forms: Form[]) {
  const presentCount = forms.filter(({ name }) => name === currentName).length

  if (presentCount > 0) {
    return `${currentName} (${presentCount})`
  }

  return currentName
}

export { getDuplicatedName, getEnumeratedName }
