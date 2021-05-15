class LightsItem {

    static createItem(item) {
        return `
            <div class="item" data-wrapper>
                <div><span>${item['Key']}</span></div>
                <div>
                ${(item['RGB'] == 1)
                    ? (`<input class="color ${item['Key']}" type="color" value="${item['Color']}">`)
                    : ('')}
                </div>
                <div>
                ${(item['Dimmable'] == 1)
                    ? (`<input class="luminosity ${item['Key']}" type="range" min="0" max="1" step="0.1" value="${item['Luminosity']}">`)
                    : (`<input class="luminosity ${item['Key']}" type="range" min="0" max="1" step="1" value="${item['Luminosity']}">`)}
                </div>
            </div>
        `
    }

    static notAvailable() {
        return `
            There is no light
        `
    }
}

export default LightsItem