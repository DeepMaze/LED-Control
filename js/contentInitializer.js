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
        this._resetLights()
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

    static async _resetLights() {
        var content = document.querySelectorAll('[data-wrapper]')[0]
        content.innerHTML = ''
        await Data.loadLights()
        var lights = Data.getLights()
        if (!lights) {
            content.innerHTML = LightsItem.notAvailable()
            return
        }
        for (var lightsItem of lights) content.innerHTML += LightsItem.createItem(lightsItem)

        var inputs = [...document.getElementsByClassName('color'), ...document.getElementsByClassName('luminosity')]
        for (var input of inputs) {
            input.addEventListener('change', (event) => this._saveLight(event.target))
        }
    }
}

export default ContentInitializer