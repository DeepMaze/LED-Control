import Router from './js/router.js'
import Api from './js/api.js'
import Data from './js/data.js'
import ContentInitializer from "./js/contentInitializer.js"



async function initialize() {
    await Data.initialize()
    await Router.initialize()
    ContentInitializer['navigation']()
}

initialize()