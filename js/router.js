import initializeListeners from './listeners.js'



var routes = ['lights', 'config']
var pages = {}


async function initialize() {
    for (var route of routes) {
        pages[`${route}`] = await fetchPage(`routes/${route}/${route}.html`)
    }
    checkRoute()
    loadContent()
    window.addEventListener("hashchange", loadContent)
}

async function fetchPage(page) {
    return await (await fetch(page)).text()
}

function loadContent() {
    checkRoute()
    var contentDiv = document.getElementById("content")
    var content = location.hash.substr(1)
    contentDiv.innerHTML = pages[content]
    initializeListeners[content]()
}

function checkRoute() {
    var doesRouteExist = routes.filter(item => { return item == location.hash.slice(1) })
    if (!location.hash || doesRouteExist.length == 0) location.hash = "#lights"
}


export default { initialize }