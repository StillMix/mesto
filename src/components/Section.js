export default class Section {
    constructor(containerSelector) {

        this._container = containerSelector;
    }

    prependItem(element) {
        this._container.prepend(element);
    }
    appendItem(element) {
        this._container.append(element);
    }

    _clear() {
        this._container.innerHTML = '';
    }

    renderItems(item) {
        this._renderer = item.renderer;
        this._renderedItems = item.items;
        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }
}