import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

    // поля, инициированные конструктором родителя:
    // this._popup
    // this._buttonClose

    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image-picture');
        this._popupTitle = this._popup.querySelector('.popup__image-title');
    }

    open = (src, title) => {
        this._popupImage.src = src;
        this._popupTitle.textContent = title;
        this._popupImage.alt = 'Изображение: ' + title;
        super.open();
    }

}