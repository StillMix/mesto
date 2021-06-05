export default class Section {
    constructor(renderer, containerSelector) {
        this._renderer = renderer;
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
        this._renderedItems = item;
        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }
}