
// ************************************************ VARIABLES ************************************************

//                 *********** profile related ************
console
let editButton = document.querySelector('.profile__button-edit');
let addButton = document.querySelector('.profile__button-add'); 

let nameOutput = document.querySelector('.profile__title');
let jobOutput = document.querySelector('.profile__subtitle');

//                 *********** popup form related ************

let formPopUp = document.querySelector('#popUpForm');

let titleElement = formPopUp.querySelector('.popup__title');
let nameInput = formPopUp.querySelector('.popup__edit-line_field_name');
let jobInput = formPopUp.querySelector('.popup__edit-line_field_description');

let submitButton = document.querySelector('.popup__button-submit');
let closeButton = document.querySelector('.popup__button-close');
let submitForm = document.querySelector('.popup__form');

let popUpEditFrom = {
  title: 'Редактировать профиль',
  itemName: 'Жак-Ив Кусто', // nameOutput.textContent
  itemNamePlaceholder: '',
  itemDescription: 'Исследователь океана', // jobOutput.textContent
  itemDescriptionPlaceholder: '',
  buttonName: 'Сохранить',
  submitHandlerFunction: buttonEditHandler
}

let popUpAddFrom = {
  title: 'Новое место',
  itemName: '',
  itemNamePlaceholder: 'Название',
  itemDescription: '',
  itemDescriptionPlaceholder: 'Ссылка на картинку',
  buttonName: 'Создать',
  submitHandlerFunction: buttonAddHandler
}

//                 *********** popup picture related ************

let picturePopUp = document.querySelector('#popUpPicture');
let closePictureButton = picturePopUp.querySelector('.popup__button-close');

//                 *********** elements/crads related ************

let cards = document.querySelector('.elements');
let cardElements = document.querySelectorAll('.elements__item');
let arrayOfCardElements = Array.from(cardElements);
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 
let elementsTemplate = document.querySelector('#elementsItem').content;
let oneElement = elementsTemplate.querySelector('.elements__item').cloneNode(true);


// ************************************************ FUNCTIONS ************************************************

//                 *********** popup form related ************

function openPopUp (title, fieldName, fieldNamePlaceholder, fieldDescription, fieldDescriptionPlaceholder, buttonName) {
  if (formPopUp.classList.contains('fading-element')) {
    formPopUp.classList.remove('transition');
    formPopUp.classList.remove('fading-element');
  }
  titleElement.textContent = title;
  nameInput.value = fieldName;
  nameInput.placeholder = fieldNamePlaceholder;
  jobInput.value = fieldDescription;
  jobInput.placeholder = fieldDescriptionPlaceholder;
  submitButton.textContent = buttonName;
  formPopUp.classList.add('popup_opened');
}

function closePopUp () {
  formPopUp.classList.add('transition');
  formPopUp.classList.add('fading-element');
}

function buttonEditHandler (evt) {
  evt.preventDefault(); 
  nameOutput.textContent = nameInput.value;
  jobOutput.textContent = jobInput.value;
  popUpEditFrom.itemName = nameInput.value;
  popUpEditFrom.itemDescription = jobInput.value;
  closePopUp();
}

function buttonAddHandler (evt) {
  evt.preventDefault();
  let title = evt.target.querySelector('.popup__edit-line_field_name').value;
  let imageAddress = evt.target.querySelector('.popup__edit-line_field_description').value;
  let newElement = oneElement;
  newElement.querySelector('.elements__title').textContent = title;
  newElement.querySelector('.elements__picture').src = imageAddress;
  newElement.querySelector('.elements__picture').alt = title;
  newElement.querySelector('.elements__delete').addEventListener('click', deleteCard);
  newElement.querySelector('.elements__like').addEventListener('click', clickLike);

  newElement.querySelector('.elements__picture').onerror = function() {
    alert('Что-то не так со ссылкой на изображение :(');
    newElement.querySelector('.elements__picture').src = './images/elements-image-not-found.png';
  }

  cards.prepend(newElement);
  closePopUp();
}

function buttonHandler(evt) {
  evt.preventDefault();
  let popUpForm = {};
  let sourceClassList = evt.target.classList.value;

  if (nameInput.classList.contains('popup__edit-line_placeholder')) {
    nameInput.classList.remove('popup__edit-line_placeholder');
  };
  if (jobInput.classList.contains('popup__edit-line_placeholder')) {
    jobInput.classList.remove('popup__edit-line_placeholder');
  };

  if (sourceClassList.includes('button-edit')) {
    popUpForm = popUpEditFrom;
  } else if (sourceClassList.includes('button-add')) {
    popUpForm = popUpAddFrom;
    nameInput.addEventListener('keydown', changingInput);
    jobInput.addEventListener('keydown', changingInput);
    nameInput.classList.add('popup__edit-line_placeholder');
    jobInput.classList.add('popup__edit-line_placeholder');
  } else return;

  openPopUp(popUpForm.title, popUpForm.itemName, popUpForm.itemNamePlaceholder, popUpForm.itemDescription, popUpForm.itemDescriptionPlaceholder, popUpForm.buttonName);
  submitForm.removeEventListener('submit', buttonEditHandler);
  submitForm.removeEventListener('submit', buttonAddHandler);
  submitForm.addEventListener('submit', popUpForm.submitHandlerFunction);
  closeButton.addEventListener('click', closePopUp);
}

function changingInput () {
  nameInput.classList.remove('popup__edit-line_placeholder');
  jobInput.classList.remove('popup__edit-line_placeholder');
}

editButton.addEventListener('click', buttonHandler);
addButton.addEventListener('click', buttonHandler);

//                 *********** popup picture related ************

function openPicture(evt) {
  evt.preventDefault();
  if (picturePopUp.classList.contains('fading-element')) {
    picturePopUp.classList.remove('transition');
    picturePopUp.classList.remove('fading-element');
  }
  let picture = evt.target;
  let pictureAdress = picture.src;
  let pictureTitleElement = picture.nextElementSibling;
  let pictureTitle = pictureTitleElement.querySelector('.elements__title').textContent;
  picturePopUp.querySelector('.popup__image-picture').src = pictureAdress;
  picturePopUp.querySelector('.popup__image-title').textContent = pictureTitle;
  picturePopUp.querySelector('.popup__image-picture').alt = pictureTitle;
  picturePopUp.classList.add('popup_opened');
}

function closePicturePopUp () {
  picturePopUp.classList.add('transition');
  picturePopUp.classList.add('fading-element');
}

closePictureButton.addEventListener('click', closePicturePopUp);

//                 *********** elements related ************

function clickLike (evt) {
  evt.preventDefault();
  let buttonLike = evt.target;
  buttonLike.classList.toggle('elements__like-active');
}

function deleteCard (evt) {
  let deleteButton = evt.target;
  let elementItem = deleteButton.closest('.elements__item');
  elementItem.remove();
}

function activateCards () {
  let index = 0;
  arrayOfCardElements.forEach( function(card) {
    card.querySelector('.elements__title').textContent = initialCards[index].name;
    card.querySelector('.elements__picture').src = initialCards[index].link;
    card.querySelector('.elements__picture').addEventListener('click', openPicture);
    card.querySelector('.elements__like').addEventListener('click', clickLike);
    card.querySelector('.elements__delete').addEventListener('click', deleteCard);
    index += 1;
  });
}

activateCards();