import Api from './api.js'
import Router from './router.js'


class Listeners {

    constructor() { }

    static navigation() {
        var lightsNav = document.getElementById('lightsNav')
        var configNav = document.getElementById('configNav')

        lightsNav.addEventListener('click', () => Router.navigate('/lights'))
        configNav.addEventListener('click', () => Router.navigate('/config'))
    }

    static config() {
        var saveConfig = document.getElementById('saveConfig')
        var defaultConfig = document.getElementById('defaultConfig')

        saveConfig.onclick = Api.saveConfig
        defaultConfig.onclick = Api.defaultConfig
    }

    static lights() {
        var createLight = document.getElementById('createLight')
        var saveColor = document.getElementById('saveColor')
        var defaultColor = document.getElementById('defaultColor')

        saveColor.onclick = Api.saveColor
        defaultColor.onclick = Api.defaultColor
    }
}

export default Listeners