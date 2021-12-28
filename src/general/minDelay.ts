function minDelay(startDate: Date, minDelayInMs = 500) {
  return new Promise(resolve => {
    const endDate = new Date()
    const timeDiffInMs = endDate.getTime() - startDate.getTime()

    if (timeDiffInMs >= minDelayInMs) {
      resolve(true)
    } else {
      setTimeout(() => resolve(true), minDelayInMs - timeDiffInMs)
    }
  })
}

export default minDelay
