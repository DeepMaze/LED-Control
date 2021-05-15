import Api from './api.js'
import Data from './data.js'
import Router from './router.js'
import ConfigItem from '../routes/config/config.item.js'
import LightsItem from '../routes/lights/lights.item.js'



class ContentInitializer {

    constructor() { }

    static navigation() {
        var lightsNav = document.getElementById('lightsNav')
        var configNav = document.getElementById('configNav')

        lightsNav.addEventListener('click', () => Router.navigate('/lights'))
        configNav.addEventListener('click', () => Router.navigate('/config'))
    }

    static config() {
        var saveConfig = document.getElementById('saveConfig')
        var resetConfig = document.getElementById('resetConfig')

        saveConfig.onclick = this._saveConfig
        resetConfig.onclick = this._resetConfig
        this._resetConfig()
    }

    static _saveConfig() {
        var keys = document.getElementsByClassName('key').map(key => { key = key.innerHTML })
        var values = document.getElementsByClassName('value').map(values => { values = values.checked })
        var config = {}
        for (var index = 0; index < keys.length; index++) config[keys[index]] = values[index].checked
        Data.setConfig(config)
    }

    static _resetConfig() {
        var content = document.querySelectorAll('[data-wrapper]')[0]
        content.innerHTML = ''
        var config = Data.getConfig()
        if (config) for (var configItem of config) content.innerHTML += ConfigItem.createItem(configItem)
        else content.innerHTML = ConfigItem.notAvailable()
    }

    static async lights() {
        await Data.loadLights()
        var saveLights = document.getElementById('saveLights')
        var resetLights = document.getElementById('resetLights')

        saveLights.onclick = this._saveLights
        resetLights.onclick = this._resetLights
        this._resetLights()
    }

    static _saveLights() {
        var lightItems = document.querySelectorAll('[data-wrapper]')
        var lights = []
        for (var item of lightItems) {
            var light = {}
            for (var child of item.children[0].children) {
                if (child.classList[0] == 'key') light['Key'] = child.innerHTML
                if (child.classList[0] == 'color') light['Color'] = child.value
                if (child.classList[0] == 'luminosity') light['Luminosity'] = child.value
            }
            if (!light['Color']) light['Color'] = ''
            if (!light['Luminosity']) light['Luminosity'] = 0
            lights.push(light)
        }
        Data.setLights(lights)
    }

    static _saveLight(element) {
        var type = element.classList[0].charAt(0).toUpperCase() + element.classList[0].slice(1)
        var key = element.classList[1]
        var currLight = Data.getLights().find(value => { return value['Key'] == key })
        var newLight = {
            'Key': key,
            'Color': (type == 'Color') ? (element.value) : (currLight['Color']),
            'Luminosity': (type == 'Luminosity') ? (element.value) : (currLight['Luminosity'])
        }
        Api.setLight(newLight)
            .then(result => console.log("result: ", result))
            .catch(error => console.error("[ERROR]: ", error))
    }

    static _resetLights() {
        var content = document.querySelectorAll('[data-wrapper]')[0]
        content.innerHTML = ''
        var lights = Data.getLights()
        if (!lights) {
            content.innerHTML = LightsItem.notAvailable()
            return
        }
        for (var lightsItem of lights) content.innerHTML += LightsItem.createItem(lightsItem)
        var colorInputs = [...document.getElementsByClassName('color')]
        var luminosityInputs = [...document.getElementsByClassName('luminosity')]

        for (var colorInput of colorInputs) {
            colorInput.addEventListener('change', (event) => this._saveLight(event.target))
        }
        for (var luminosityInput of luminosityInputs) {
            luminosityInput.addEventListener('change', (event) => this._saveLight(event.target))
        }

    }
}

export default ContentInitializer