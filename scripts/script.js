let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container');
let buttonEdit = document.querySelector('.profile__button-edit');
let buttonClose = document.querySelector('.popup__button-close');

let nameInput = formElement.querySelector('.popup__edit-line_field_name');
let jobInput = formElement.querySelector('.popup__edit-line_field_description');

let nameOutput = document.querySelector('.profile__title');
let jobOutput = document.querySelector('.profile__subtitle');

function openPopup () {
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
  popup.classList.add('popup_opened');
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    
    // Получите значение полей jobInput и nameInput из свойства value
    //      nameInput и jobInput заданы выше
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
buttonEdit.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);