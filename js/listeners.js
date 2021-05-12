import database from '../js/database.js'



const routes = {
    color: initializeColorListener,
    config: initializeConfigListener,
}

function initializeColorListener() {
    var saveColor = document.getElementById('saveColor');
    var defaultColor = document.getElementById('defaultColor');

    saveColor.onclick = database.saveColor
    defaultColor.onclick = database.defaultColor
}

function initializeConfigListener() {
    var saveConfig = document.getElementById('saveConfig');
    var defaultConfig = document.getElementById('defaultConfig');

    saveConfig.onclick = database.saveConfig
    defaultConfig.onclick = database.defaultConfig
}

export default routes