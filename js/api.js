class Api {
    static _apiUrl = 'http://192.168.178.72:3000'

    constructor() { }

    static _sendRequest(method, route, tokenOptions = { sendAccessToken }, payload) {
        return new Promise((resolve, reject) => {
            var url = `${this._apiUrl}${route}`
            var xhr = new XMLHttpRequest()
            xhr.open(method.toUpperCase(), url, true)
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')

            if (tokenOptions.sendAccessToken) xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)

            xhr.addEventListener('load', (response) => resolve(response.currentTarget))
            xhr.addEventListener('error', (error) => reject(error))

            xhr.send(JSON.stringify(payload))
        })
    }

    static getConfig() {
        return new Promise((resolve, reject) => {
            this._sendRequest('GET', '/config/getConfig', { sendAccessToken: false }, null)
                .then(result => resolve(result.response))
                .catch(error => reject(error))
        })
    }

    static setConfig(config) {
        return new Promise((resolve, reject) => {
            this._sendRequest('POST', '/config/updateConfig', { sendAccessToken: false }, config)
                .then(result => resolve(result.response))
                .catch(error => reject(error))
        })
    }

    static getLights() {
        return new Promise((resolve, reject) => {
            this._sendRequest('GET', '/light/getLights', { sendAccessToken: false }, null)
                .then(result => resolve(result.response))
                .catch(error => reject(error))
        })
    }

    static setLight(light) {
        return new Promise((resolve, reject) => {
            this._sendRequest('PATCH', '/light/updateLight', { sendAccessToken: false }, light)
                .then(result => resolve(result.response))
                .catch(error => reject(error))
        })
    }

    static saveLight(light) {
        return new Promise((resolve, reject) => {
            this._sendRequest('PUT', '/light/createLight', { sendAccessToken: false }, light)
                .then(result => resolve(result.response))
                .catch(error => reject(error))
        })
    }

    static deleteLight(lightKey) {
        return new Promise((resolve, reject) => {
            this._sendRequest('DELETE', '/light/deleteLight', { sendAccessToken: false }, { Key: lightKey })
                .then(result => resolve(result.response))
                .catch(error => reject(error))
        })
    }
}

export default Api