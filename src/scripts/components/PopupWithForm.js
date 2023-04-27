import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

    // this._popup               /* super */
    // this._buttonClose         /* super */
    // this._handleFormSubmit    /* constructor */
    // this._popupForm           /* constructor */
    // this._inputList           /* _getInputValues */
    // this._formValues          /* _getInputValues */

    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__edit-line');
        this._formValues = {};
        this._inputList.forEach(input => {
          this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {this._handleFormSubmit(evt, this._getInputValues());});
    }



}