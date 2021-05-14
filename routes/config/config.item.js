function configItem(config) {
    return `
        <div class="item">
            <fieldset>
                <legend>${ config['Config_Key'] }</legend>
                <input class="configValue" value="${ config['Config_Value'] }" placeholder="Wert">
            </fieldset>
        </div>
    `
}

export default configItem