import Api from './api.js'
import Data from './data.js'
import Router from './router.js'
import ConfigItem from '../routes/config/config.item.js'
import LightsItem from '../routes/lights/lights.item.js'



class ContentInitializer {

    constructor() { }

    static navigation() {
        document.getElementById('lightsNav').addEventListener('click', () => Router.navigate('/lights'))
        document.getElementById('configNav').addEventListener('click', () => Router.navigate('/config'))
    }

    static config() {
        document.getElementById('saveConfig').addEventListener('click', () => { this._saveConfig() })
        document.getElementById('resetConfig').addEventListener('click', () => { this._resetConfig() })
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
        var config = Data.getConfig()
        content.innerHTML = ''
        if (config) for (var configItem of config) content.innerHTML += ConfigItem.createItem(configItem)
        else content.innerHTML = ConfigItem.notAvailable()
    }

    static async lights() {
        document.getElementById('createNew').addEventListener('click', () => { Router.navigate('/createLight') })
        this._resetLights()
    }

    static _saveLight(element) {
        var key = element.parentElement.parentElement.attributes.key.value
        var type = element.classList[0].charAt(0).toUpperCase() + element.classList[0].slice(1)
        var currLight = Data.getLights().find(value => { return value['Key'] == key })
        var newLight = {
            'Key': key,
            'Color': (type == 'Color') ? (element.value) : (currLight['Color']),
            'Luminosity': (type == 'Luminosity') ? (element.value) : (currLight['Luminosity'])
        }
        Api.setLight(newLight)
            .then(() => { })
            .catch((error) => console.error("[ERROR]: ", error))
    }

    static async _resetLights() {
        var content = document.querySelectorAll('[data-wrapper]')[0]
        content.innerHTML = ''
        await Data.loadLights()
        var lights = Data.getLights()
        if (lights.length == 0) {
            content.innerHTML = LightsItem.notAvailable()
            return
        }
        for (var lightsItem of lights) content.innerHTML += LightsItem.createItem(lightsItem)
        var inputs = [...document.getElementsByClassName('color'), ...document.getElementsByClassName('luminosity')]
        for (var input of inputs) input.addEventListener('change', (event) => {
            event.path[1].style.backgroundColor = event.target.value
            this._saveLight(event.target)
        })
        var deleteButtons = [...document.getElementsByClassName('delete')]
        for (var deleteButton of deleteButtons)
            deleteButton.addEventListener('click', (event) => {
                Api.deleteLight(event.target.attributes.key.value)
                    .then(() => event.target.parentElement.outerHTML = '')
                    .catch((error) => console.error('[ERROR] ', error))
            })
    }

    static async createLight() {
        document.getElementById('createLight').addEventListener('click', () => { this._createLight() })
        document.getElementById('cancel').addEventListener('click', () => { Router.navigate('/lights') })
    }

    static async _createLight() {
        var key = document.getElementById('key')
        var doesAlreadyExist = this._doesKeyAlreadyExist(key.value)
        if (doesAlreadyExist) {
            window.alert('Ein Licht mit diesem Namen exisitert bereits!')
            return
        }
        var rgb = document.getElementById('rgb')
        var dimmable = document.getElementById('dimmable')
        Api.saveLight({ 'Key': key.value, 'RGB': rgb.checked, 'Dimmable': dimmable.checked, })
            .then(() => {
                key.value = ''
                rgb.checked = false
                dimmable.checked = false
                window.alert('Neues Licht wurde erstellt!')
            })
            .catch((error) => console.error(error))
    }

    static _doesKeyAlreadyExist(key) {
        return Data.getLights().find((element) => { return element['Key'] == key })
    }
}

export default ContentInitializer