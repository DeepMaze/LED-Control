import initializeListeners from './listeners.js'
import routes from './routes.js'



let routerElement = document.querySelectorAll('[router-outlet]')[0]

async function initialize() {
    routerElement.innerHTML = await fetchPage(routes[window.location.pathname])
    initializeListeners[window.location.pathname.slice(1)]()
}

async function navigate(pathName) {
    window.history.pushState({}, pathName, window.location.origin + pathName)
    routerElement.innerHTML = await fetchPage(routes[pathName])
}

async function fetchPage(page) {
    return await (await fetch(page)).text()
}

export default { initialize, navigate }