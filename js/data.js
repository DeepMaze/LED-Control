import Api from "./api.js"



class Data {
    static _config = {}
    static _lights = []

    constructor() { }

    static initialize() {
        this.loadConfig()
    }

    static async loadConfig() {
        var config = await Api.getConfig()
        if (!config || config.length < 1) console.error('Config could not get loaded')
        this.config = config
    }

    static getConfig() { return this._config }
    static setConfig(config = {}) { this._config = config }
}


export default Data