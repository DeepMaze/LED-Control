import api from './api.js'
import snackbar from "./snackbar.js";



const routes = {
    lights: initializeLightsListener,
    config: initializeConfigListener,
}

function initializeLightsListener() {
    var createLight = document.getElementById('createLight')
    var saveColor = document.getElementById('saveColor')
    var defaultColor = document.getElementById('defaultColor')

    createLight.onclick = snackbar.createLight
    saveColor.onclick = api.saveColor
    defaultColor.onclick = api.defaultColor
}

function initializeConfigListener() {
    var saveConfig = document.getElementById('saveConfig')
    var defaultConfig = document.getElementById('defaultConfig')

    saveConfig.onclick = api.saveConfig
    defaultConfig.onclick = api.defaultConfig
}

export default routes