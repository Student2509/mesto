export class FormValidation {

    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
        // ----- генерируются за пределами конструктора: -----
        // this._inputList;
        // this._buttonElement;
    }

    _showInputError = (formElement, inputElement, errorMessage, settings) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(settings.errorClass);
    };
        
    _hideInputError = (formElement, inputElement, settings) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(settings.inputErrorClass);
        errorElement.classList.remove(settings.errorClass);
        errorElement.textContent = '';
    };
        
    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
        
    toggleButtonState = (inputList, buttonElement, settings) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(settings.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(settings.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }
        
    _checkInputValidity = (formElement, inputElement, settings) => {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, settings);
        } else {
            this._hideInputError(formElement, inputElement, settings);
        }
    };
        
    _setEventListeners = (formElement, settings) => {
        this._inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
        this._buttonElement = formElement.querySelector(settings.submitButtonSelector);
        this.toggleButtonState(this._inputList, this._buttonElement, settings);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement, settings);
                this.toggleButtonState(this._inputList, this._buttonElement, settings);
            });
        });       
    };
        
    enableValidation = () => {
        this._setEventListeners(this._formElement, this._settings);
    };
}