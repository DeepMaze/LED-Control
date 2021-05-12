import router from './js/router.js'
import api from './js/api.js'


await router.initialize()
// await api.getInitializationData()
// await api.getLights()

location.pathname += '/test'

console.log(location.pathname)