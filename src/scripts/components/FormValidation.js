export class FormValidation {

    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
        // ----- генерируются за пределами конструктора: -----
        // this._inputList;
        // this._buttonElement;
    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
    };
        
    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = '';
    };
        
    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
        
    toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._settings.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }
        
    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };
        
        _setEventListeners = () => {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
        this.toggleButtonState(this._inputList);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState(this._inputList);
            });
        });       
    };
        
    enableValidation = () => {
        this._setEventListeners(this._formElement, this._settings);
    };
}