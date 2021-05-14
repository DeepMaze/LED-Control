

class Api {
    static _apiUrl = 'http://localhost:3000'

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

    static async getConfig() {
        return await this._sendRequest('GET', '/config/getConfig', { sendAccessToken: false }, null)
    }

    static async getLights() {
        return await this._sendRequest('GET', '/light/getLights', { sendAccessToken: false }, null)
    }


    static saveColor() {
        console.log('saveColor')
    }

    static defaultColor() {
        console.log('defaultColor')
    }

    static saveConfig() {
        console.log('saveConfig')
    }

    static defaultConfig() {
        console.log('defaultConfig')
    }
}

export default Api