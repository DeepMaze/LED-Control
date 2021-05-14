const apiUrl = 'http://localhost:3000'

function sendRequest(method, route, tokenOptions = { sendAccessToken }, payload) {
    return new Promise((resolve, reject) => {
        var url = `${apiUrl}${route}`
        var xhr = new XMLHttpRequest()
        xhr.open(method.toUpperCase(), url, true)
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')

        if (tokenOptions.sendAccessToken) xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)

        xhr.addEventListener('load', (response) => resolve(response.currentTarget))
        xhr.addEventListener('error', (error) => reject(error))

        xhr.send(JSON.stringify(payload))
    })
}

async function getInitializationData() {
    await sendRequest('GET', '/config/getConfig', false, null)
        .then(result => console.log("result: ", JSON.parse(result.response)))
        .catch(error => console.error(error))
}

async function getLights() {
    await sendRequest('GET', '/light/getLights', false, null)
        .then(result => console.log("result: ", JSON.parse(result.response)))
        .catch(error => console.error(error))
}


function saveColor() {
    console.log('saveColor')
}

function defaultColor() {
    console.log('defaultColor')
}

function saveConfig() {
    console.log('saveConfig')
}

function defaultConfig() {
    console.log('defaultConfig')
}

export default { getInitializationData, getLights, saveColor, defaultColor, saveConfig, defaultConfig }