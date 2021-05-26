class LightsItem {

    static createItem(item) {
        return `
            <div class="item" data-wrapper key="${item['Key']}">
                <div><span>${item['Key']}</span></div>
                ${(item['RGB'] == 1)
                ? (this._addColor(item))
                : ('')}
                ${this._addLuminosity(item)}
                <button class="delete" key="${item['Key']}">Löschen</button>
            </div>
        `
    }

    static _addColor(item) {
        return `
            <div class="colorWrapper" style="background-color: ${item['Color']};">
                <input class="color" type="color" value="${item['Color']}">
            </div>`
    }

    static _addLuminosity(item) {
        if (item['Dimmable'] == 1) {
            return `
                <div>
                    <input class="luminosity" type="range" min="0" max="1" step="0.1" value="${item['Luminosity']}">
                </div>`
        } else {
            return `
                <div>
                    <input class="luminosity" type="range" min="0" max="1" step="1" value="${item['Luminosity']}">
                </div>`
        }
    }

    static notAvailable() {
        return `
            There is no light
        `
    }
}

export default LightsItem