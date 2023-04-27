export default class Popup {

    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._buttonClose = this._popup.querySelector('.popup__button-close');
    }

    open() {
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._buttonClose.addEventListener('click', this.close.bind(this));
        this._popup.addEventListener('click', this._handleCloseByClickOutside.bind(this));
    }

    _handleCloseByClickOutside (evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }
    
}