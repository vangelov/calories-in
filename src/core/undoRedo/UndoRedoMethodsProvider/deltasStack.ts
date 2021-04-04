import { Delta } from 'jsondiffpatch'

class DeltaNode {
  delta: Delta

  nextNode: DeltaNode | undefined
  prevNode: DeltaNode | undefined

  constructor(delta: Delta) {
    this.delta = delta
  }
}

const MAX_SIZE = 100

class DeltasStack {
  startNode: DeltaNode | undefined = undefined
  pointerNode: DeltaNode | undefined = undefined
  size: number = 0
  canUnpatch: boolean = false
  canPatch: boolean = false

  getNextDeltaToUnpatch(): Delta | null {
    if (!this.canUnpatch) {
      return null
    }

    if (!this.pointerNode) {
      this.pointerNode = this.startNode
    } else {
      this.pointerNode = this.pointerNode.nextNode
    }

    if (this.pointerNode) {
      this.canUnpatch = this.pointerNode.nextNode !== undefined
      this.canPatch = true

      return this.pointerNode.delta
    }

    this.canUnpatch = false

    return null
  }

  getNextDeltaToPatch(): Delta | null {
    if (this.pointerNode) {
      const delta = this.pointerNode.delta

      this.pointerNode = this.pointerNode.prevNode

      this.canPatch = this.pointerNode !== undefined
      this.canUnpatch = true

      return delta
    }

    return null
  }

  keepOnlyLast(n: number) {
    let node: DeltaNode | undefined = this.startNode
    let index = 0

    while (node) {
      if (index + 1 === n) {
        this.size = n
        node.nextNode = undefined
        break
      }

      node = node.nextNode
      index++
    }
  }

  push(delta: Delta) {
    if (this.pointerNode) {
      this.startNode = this.pointerNode.nextNode
      this.pointerNode = undefined
    }

    const node = new DeltaNode(delta)

    if (!this.startNode) {
      this.startNode = node
    } else {
      node.nextNode = this.startNode
      this.startNode.prevNode = node
      this.startNode = node
    }

    this.size++

    if (this.size >= MAX_SIZE) {
      this.keepOnlyLast(Math.floor(MAX_SIZE / 2))
    }

    this.canUnpatch = true
    this.canPatch = false
  }
}

export default DeltasStack
