function createFileInput(accept: string) {
  const input = document.createElement('input')
  input.type = 'file'
  input.multiple = false
  input.accept = accept

  return input
}

function selectFile(accept: string) {
  return new Promise<File>(resolve => {
    const input = createFileInput(accept)

    input.addEventListener('change', function onChange(this: HTMLInputElement) {
      const { files } = this

      if (files && files.length > 0) {
        resolve(files[0])
      }
    })
    input.dispatchEvent(new MouseEvent('click'))
  })
}

function readFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader()

    fileReader.onload = () => {
      const { result } = fileReader
      resolve(result as string)
    }

    fileReader.onerror = () => {
      const { error } = fileReader
      fileReader.abort()
      reject(error)
    }

    fileReader.readAsText(file)
  })
}

export { selectFile, readFile }
