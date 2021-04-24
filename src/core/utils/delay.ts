function delay(ms: number) {
  return new Promise(done => setTimeout(done, ms))
}

export default delay
