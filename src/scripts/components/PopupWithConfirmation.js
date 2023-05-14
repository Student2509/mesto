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

    close() {
        super.close();
        this._popupForm.reset();
    }

    getForm() {
        return this._popupForm;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            this._handleFormSubmit(evt);
        });
    }

    toggleAwaitingState() {
        this._buttonSubmit.textContent.includes('...') 
        ? this._buttonSubmit.textContent = this._buttonSubmitDefaultTitle
        : this._buttonSubmit.textContent = this._buttonSubmitAwaitingText;
        console.log(this._buttonSubmit.textContent);
    }

    setAwaitingState() {
        this._buttonSubmit.textContent = this._buttonSubmitAwaitingText;
    }

    setDefaultState() {
        this._buttonSubmit.textContent = this._buttonSubmitDefaultTitle;
    }

}