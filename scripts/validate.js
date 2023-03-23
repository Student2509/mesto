//                 *********** VALIDATION related ************

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};
  
const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};
  
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}
  
const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    // formElement.addEventListener('submit', function (evt) {
    //   evt.preventDefault();
    // });
    setEventListeners(formElement, settings);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__edit-line',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_non-active',
  inputErrorClass: 'popup__edit-line_incorrect',
  errorClass: 'popup__edit-line-error'
});

// function setDefaultErrorFields(popup) {
//   const inputList = popup.querySelectorAll('.popup__edit-line');
//   inputList.forEach(function(input) {
//     if ((input.classList.contains('popup__edit-line_incorrect')) || (input.classList.contains('popup__edit-line-error'))) {
//       hideInputError(popup.querySelector('.form'), input);
//     }
//   });
// }