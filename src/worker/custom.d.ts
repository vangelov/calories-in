declare module 'comlink-loader!*' {
  class WebpackWorker extends Worker {
    constructor()

    processData(data: any): Promise<Blob>
  }

  export = WebpackWorker
}
