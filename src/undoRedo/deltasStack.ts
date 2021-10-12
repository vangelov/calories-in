import { Delta } from 'jsondiffpatch'
import { AppLocation } from './appLocation'

type DeltaNode = {
  delta: Delta
  appLocation: AppLocation
  nextNode?: DeltaNode
  prevNode?: DeltaNode
}

const MAX_SIZE = 100
class DeltasStack {
  startNode?: DeltaNode = undefined
  pointerNode?: DeltaNode = undefined
  size: number = 0
  canUnpatch: boolean = false
  canPatch: boolean = false

  getNextNodeToUnpatch(): DeltaNode | null {
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

      // jsondiffpatch sometimes modifies this delta for some reason
      return this.pointerNode
    }

    this.canUnpatch = false

    return null
  }

  getNextNodeToPatch(): DeltaNode | null {
    if (this.pointerNode) {
      const result = this.pointerNode
      this.pointerNode = this.pointerNode.prevNode

      this.canPatch = this.pointerNode !== undefined
      this.canUnpatch = true

      return result
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

  push(delta: Delta, appLocation: AppLocation) {
    if (this.pointerNode) {
      this.startNode = this.pointerNode.nextNode
      this.pointerNode = undefined
    }

    const node: DeltaNode = {
      delta,
      appLocation,
    }

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
