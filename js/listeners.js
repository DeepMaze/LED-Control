import api from './api.js'
import snackbar from './snackbar.js'
import router from './router.js'


const routes = {
    "navigation": initializeNavigationListeners,
    "lights": initializeLightsListener,
    "config": initializeConfigListener,
}

function initializeNavigationListeners() {
    var lightsNav = document.getElementById('lightsNav')
    var configNav = document.getElementById('configNav')

    lightsNav.addEventListener('click', () => router.navigate('/lights'))
    configNav.addEventListener('click', () => router.navigate('/config'))
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