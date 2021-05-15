class ConfigItem {

    static createItem(item) {
        return `
            <div class="item" data-wrapper>
                <input type="checkbox" class="value" id="${item['Key']}"${item['Value'] == 1 ? " checked" : ""} placeholder="Wert">
                <label for="${item['Key']}">${item['Key']}</label>
            </div>
        `
    }

    static notAvailable() {
        return `
            There is no config
        `
    }
}

export default ConfigItem