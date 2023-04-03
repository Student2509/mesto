export class FormValidation {

    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    }

    static _showInputError = (formElement, inputElement, errorMessage, settings) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(settings.errorClass);
    };
        
    static _hideInputError = (formElement, inputElement, settings) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(settings.inputErrorClass);
        errorElement.classList.remove(settings.errorClass);
        errorElement.textContent = '';
    };
        
    static _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
        
    static _toggleButtonState = (inputList, buttonElement, settings) => {
        if (FormValidation._hasInvalidInput(inputList)) {
            buttonElement.classList.add(settings.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(settings.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }
        
    static _checkInputValidity = (formElement, inputElement, settings) => {
        if (!inputElement.validity.valid) {
            FormValidation._showInputError(formElement, inputElement, inputElement.validationMessage, settings);
        } else {
            FormValidation._hideInputError(formElement, inputElement, settings);
        }
    };
        
    _setEventListeners = (formElement, settings) => {
        const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
        const buttonElement = formElement.querySelector(settings.submitButtonSelector);
        // const currentElement = this;
        FormValidation._toggleButtonState(inputList, buttonElement, settings);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                FormValidation._checkInputValidity(formElement, inputElement, settings);
                FormValidation._toggleButtonState(inputList, buttonElement, settings);
                // currentElement._checkInputValidity(formElement, inputElement, settings);
                // currentElement._toggleButtonState(inputList, buttonElement, settings);
            });
        });       
    };
        
    enableValidation = () => {
        this._setEventListeners(this._formElement, this._settings);
    };
}