import Listeners from './listeners.js'



class Router {
    static _routerElement = document.querySelectorAll('[router-outlet]')[0]
    static _routes = {
        '/': 'routes/lights/lights.html',
        '/lights': 'routes/lights/lights.html',
        '/config': 'routes/config/config.html'
    }

    constructor() { }

    static async initialize() {
        this._routerElement.innerHTML = await this.fetchPage(this._routes[window.location.pathname])
        if (window.location.pathname.slice(1).length > 0) Listeners[window.location.pathname.slice(1)]()
        else Listeners['lights']()
    }

    static async navigate(pathName) {
        window.history.pushState({}, pathName, window.location.origin + pathName)
        this._routerElement.innerHTML = await this.fetchPage(this._routes[pathName])
        if (pathName.slice(1).length > 0) Listeners[pathName.slice(1)]()
        else Listeners['lights']()
    }

    static async fetchPage(page) {
        return await (await fetch(page)).text()
    }
}

export default Router