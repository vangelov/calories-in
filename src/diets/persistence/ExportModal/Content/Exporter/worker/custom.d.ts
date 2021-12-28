declare module 'comlink-loader!*' {
  import { Params } from './types'

  class WebpackWorker extends Worker {
    constructor()

    getDietPdfBlob(data: Params): Promise<Blob>
  }

  export = WebpackWorker
}
