import api from './js/api.js'
import routesListener from "./js/listeners.js"
import router from './js/router.js'



routesListener['navigation'](router)

router.initialize()

await api.getInitializationData()
await api.getLights()