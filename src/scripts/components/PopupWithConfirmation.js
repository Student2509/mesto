import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {

    // this._popup
    // this._buttonClose
    // this._handleFormSubmit    /* constructor */
    // this._popupForm           /* constructor */
    // this._buttonSubmit        /* constructor */
    // this._buttonSubmitDefaultTitle  /* constructor */

    // open()
    // close()
    // _handleEscClose
    // _handleCloseByClickOutside
    // setEventListeners()

    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._buttonSubmit = this._popupForm.querySelector('.popup__button-submit');
        this._buttonSubmitDefaultTitle = this._buttonSubmit.textContent;
        this._buttonSubmitAwaitingText = 'Удаление...';
    }

    open(cardId, cardElement) {
        super.open();
        this._cardId = cardId;
        this._cardElement = cardElement;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._cardId, this._cardElement);
        });
    }

    toggleAwaitingState() {
        this._buttonSubmit.textContent.includes('...') 
        ? this._buttonSubmit.textContent = this._buttonSubmitDefaultTitle
        : this._buttonSubmit.textContent = this._buttonSubmitAwaitingText;
    }

}