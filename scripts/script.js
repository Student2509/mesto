let formElement = document.querySelector('.content .popup .popup__container');

let formElementFields = formElement.querySelectorAll('.popup__edit-field .popup__edit-line');

let nameInput = formElementFields[0];
let jobInput = formElementFields[1];

let nameOutput = document.querySelector('.content .profile .profile__title-grid .profile__grid .profile__title');
let jobOutput = document.querySelector('.content .profile .profile__title-grid .profile__grid .profile__subtitle');

function popupSwitcher () {
  let popup = document.querySelector('.content .popup');
  popup.classList.toggle('popup_opened');
}
  
function setDefaultForm () {
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
}

function handleEditButton () {  
  setDefaultForm();
  popupSwitcher();
}

function handleCloseButton () {
  popupSwitcher();
}

function handleSaveButton () {
  nameOutput.textContent = nameInput.value;
  jobOutput.textContent = jobInput.value;
  popupSwitcher();
}

let buttonEdit = document.querySelector('.content .profile .profile__title-grid .profile__grid .profile__button-edit');
let buttonClose = formElement.querySelector('.popup__button-close');
let buttonSave = formElement.querySelector('.popup__button-save');

buttonEdit.addEventListener('click', handleEditButton);
buttonClose.addEventListener('click', handleCloseButton);
buttonSave.addEventListener('click', handleSaveButton);

function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    
    // Получите значение полей jobInput и nameInput из свойства value
    let name = nameInput.value;
    let job = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    nameOutput.textContent = name;
    jobOutput.textContent = job;
    popupSwitcher();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);