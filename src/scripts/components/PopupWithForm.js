import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

    // this._popup               /* super */
    // this._buttonClose         /* super */
    // this._handleFormSubmit    /* constructor */
    // this._popupForm           /* constructor */
    // this._buttonSubmit        /* constructor */
    // this._inputList           /* _getInputValues */
    // this._formValues          /* _getInputValues */

    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._buttonSubmit = this._popupForm.querySelector('.popup__button-submit');
        this._inputList = this._popupForm.querySelectorAll('.popup__edit-line');
        this._buttonSubmitDefaultTitle = this._buttonSubmit.textContent;
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    _getInputValues() {
        // this._inputList = this._popup.querySelectorAll('.popup__edit-line');
        this._formValues = {};
        this._inputList.forEach(input => {
          this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    // setEventListeners(someFunction) {
    //     super.setEventListeners();
    //     if (typeof someFunction === 'function') {
    //         this._popupForm.addEventListener('submit', someFunction);
    //     } else {
    //         this._popupForm.addEventListener('submit', (evt) => {this._handleFormSubmit(evt, this._getInputValues());});   
    //     }
    // }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {this._handleFormSubmit(evt, this._getInputValues());});
    }

    toggleAwaitingState() {
        // console.log('entering toggleAwaiting PoPuWForm');
        // console.log(this._popup);
        const income = this._buttonSubmit.textContent;
        let buttonAwaitingText = '';
        switch (this._buttonSubmitDefaultTitle) {
            case 'Сохранить':
                buttonAwaitingText = 'Сохранение...';
                break;
            case 'Создать': 
                buttonAwaitingText = 'Создание...';
                break;
            case 'Да': 
                buttonAwaitingText = 'Удаление...';
                break;    
            default:
                buttonAwaitingText = 'Выполнение...';
        }
        this._buttonSubmit.textContent.includes('...') 
        ? this._buttonSubmit.textContent = this._buttonSubmitDefaultTitle
        : this._buttonSubmit.textContent = buttonAwaitingText;
        console.log(`changing from ${income} to ${this._buttonSubmit.textContent}`);
    }

}