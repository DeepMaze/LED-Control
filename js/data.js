import Api from "./api.js"



class Data {
    static _config = {}
    static _lights = []

    constructor() { }

    static async initialize() {
        await this.loadConfig()
    }

    static async loadConfig() {
        var config = JSON.parse(await Api.getConfig())
        if (!config || config.length < 1) console.error('Config could not get loaded')
        this._config = config
    }

    static getConfig() { return this._config }
    static setConfig(config = {}) {
        this._config = config
        Api.setConfig(this._config)
            .catch(error => console.error(error))
    }

    static async loadLights() {
        var lights = JSON.parse(await Api.getLights())
        if (!lights || lights.length < 1) console.error('Config could not get loaded')
        this._lights = lights
    }

    static getLights() { return this._lights }
    static setLights(lights = []) {
        this._lights = lights
        Api.setLights(this._lights)
            .catch(error => console.error(error))
    }
}


export default Data