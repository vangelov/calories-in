function fixWhiteSpace(text: string) {
  return text.replace(/\\n/g, '\n').replace(/\r/g, '\r').replace(/\t/g, '\t')
}

export default fixWhiteSpace
