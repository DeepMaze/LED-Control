import initializeListeners from './listeners.js'



var routes = ['color', 'config']
var pages = {}


async function initialize() {
    for (var route of routes) {
        pages[`${route}`] = await fetchPage(`routes/${route}/${route}.html`)
    }
    if (!location.hash) location.hash = "#color"
    loadContent()
    window.addEventListener("hashchange", loadContent)
}

async function fetchPage(page) {
    return await (await fetch(page)).text()
}

function loadContent() {
    var contentDiv = document.getElementById("content")
    var content = location.hash.substr(1)
    contentDiv.innerHTML = pages[content]
    initializeListeners[content]()
}


export default { initialize }