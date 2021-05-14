import Listeners from './listeners.js'
import routes from './routes.js'



class Router {
    static routerElement = document.querySelectorAll('[router-outlet]')[0]

    constructor() { }

    static async initialize() {
        this.routerElement.innerHTML = await this.fetchPage(routes[window.location.pathname])
        Listeners[window.location.pathname.slice(1)]()
    }

    static async navigate(pathName) {
        window.history.pushState({}, pathName, window.location.origin + pathName)
        this.routerElement.innerHTML = await this.fetchPage(routes[pathName])
        Listeners[pathName.slice(1)]()
    }

    static async fetchPage(page) {
        return await (await fetch(page)).text()
    }
}

export default Router