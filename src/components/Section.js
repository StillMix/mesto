export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
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

    addRenderCard() {
        this._renderer();
    }
    renderItems() {
        this._clear();

        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }
}