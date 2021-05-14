import Router from './js/router.js'
import Api from './js/api.js'
import Data from './js/data.js'
import Listeners from "./js/listeners.js"



function initialize() {
    Listeners['navigation']()
    Router.initialize()
    Data.initialize()

    setConfigData()
    // await api.getLights()
}

async function setConfigData() {

}

initialize()