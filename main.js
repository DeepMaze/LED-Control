import Router from './js/router.js'
import Api from './js/api.js'
import Data from './js/data.js'
import Listeners from "./js/listeners.js"



async function initialize() {
    Listeners['navigation']()
    await Router.initialize()
    Data.initialize()
        .then(result => setConfigData())
        .catch(error => console.error("[ERROR] ", error))

}

async function setConfigData() {
    var config = Data.getConfig()
    console.log(config)
}

initialize()