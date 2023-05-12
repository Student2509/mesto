export default class Section {

    constructor({ /* items, */ renderer }, containerSelector) {
        // this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._container.prepend(element);
    }
    
    _clear() {
        this._container.innerHTML = '';
    }
    
    renderItems(items) {
        this._renderedItems = items;
        this._clear();
        this._renderedItems.forEach(item => {
          this._renderer(item);
        });
    }

}