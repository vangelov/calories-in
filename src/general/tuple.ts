function tuple<S, M>(state: S, methods: M): [S, M] {
  return [state, methods]
}

export default tuple
