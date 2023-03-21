//                 *********** VALIDATION related ************

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__edit-line_incorrect');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__edit-line-error');
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__edit-line_incorrect');
    errorElement.classList.remove('popup__edit-line-error');
    errorElement.textContent = '';
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button-submit_non-active');
    } else {
      buttonElement.classList.remove('popup__button-submit_non-active');
    }
  }
  
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__edit-line'));
    const buttonElement = formElement.querySelector('.popup__button-submit');
    if (formElement.id != 'editProfileFormSet') {
      toggleButtonState(inputList, buttonElement);
    }
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      
      const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
      fieldsetList.forEach((fieldSet) => {
        setEventListeners(fieldSet);
      }); 
  
    });
  };
  
  function setDefaultErrorFields(popup) {
    const inputList = popup.querySelectorAll('.popup__edit-line');
    inputList.forEach(function(input) {
      if ((input.classList.contains('popup__edit-line_incorrect')) || (input.classList.contains('popup__edit-line-error'))) {
        hideInputError(popup.querySelector('.form'), input);
      }
    });
  }
  
  enableValidation();