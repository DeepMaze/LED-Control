class ConfigItem {

    static createItem(item) {
        return `
            <div class="item" data-wrapper>
                <label class="checkboxWrapper">
                    <span class="checkbox">
                        <input type="checkbox" id="${item['Key']}"${item['Value'] == 1 ? " checked" : ""}>
                        <span class="checkboxControl">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"
                                focusable="false">
                                <path fill="none" stroke="#273535" stroke-width="3" d="M1.73 12.91l6.37 6.37L22.79 4.59" />
                            </svg>
                        </span>
                    </span>
                    <span class="checkboxLabel">${item['Key']}</span>
                </label>
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