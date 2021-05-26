import Api from "./api.js"



class Data {
    static _config = {}
    static _lights = []

    constructor() { }

    static async initialize() {
        await this.loadConfig()
        await this.loadLights()
    }

    static async loadConfig() {
        this._config = JSON.parse(await Api.getConfig())
    }

    static getConfig() { return this._config }
    static setConfig(config = {}) {
        this._config = config
        Api.setConfig(this._config)
            .catch(error => console.error(error))
    }

    static async loadLights() {
        this._lights = JSON.parse(await Api.getLights())
    }

    static getLights() { return this._lights }
    static setLights(lights = []) {
        this._lights = lights
        Api.setLights(this._lights)
            .catch(error => console.error(error))
    }
}


export default Data