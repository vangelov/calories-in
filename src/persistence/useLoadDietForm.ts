import { getDietForm } from 'diets'
import { loadFile, readFile } from './file'
import { useState } from 'react'
import parseDietForm from './parseDietForm'
import { delay } from 'general'

function loadLastOrDefault() {
  const savedValue = localStorage.getItem('lastDietForm')

  if (savedValue) {
    try {
      return JSON.parse(savedValue)
    } catch (error) {
      return getDietForm()
    }
  }

  return getDietForm()
}

function useLoadDietForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | DOMException | null>()
  const [dietForm, setDietForm] = useState(loadLastOrDefault)

  async function onLoadFromFile() {
    try {
      const file = await loadFile('*.pdf')
      setIsLoading(true)
      const text = await readFile(file)
      await delay(300)
      setDietForm(parseDietForm(text))
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    onLoadFromFile,
    isLoading,
    dietForm,
    error,
  }
}

export default useLoadDietForm
