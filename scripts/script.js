
// ************************************************ VARIABLES ************************************************

//                 *********** profile related ************

let editButton = document.querySelector('.profile__button-edit');
let addButton = document.querySelector('.profile__button-add'); 

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

//                 *********** popup edit form related ************

let editPopUp = document.querySelector('#popUpEdit');
let editForm = editPopUp.querySelector('.popup__form');
let editFormTitle = editPopUp.querySelector('.popup__title');
let editFormNameInput = editPopUp.querySelector('.popup__edit-line_field_name');
let editFormJobInput = editPopUp.querySelector('.popup__edit-line_field_description');
let editFormButtonSubmit = editPopUp.querySelector('.popup__button-submit');
let editFormButtonClose = editPopUp.querySelector('.popup__button-close');

let popUpEditFromDefault = {
  title: 'Редактировать профиль',
  itemName: 'Жак-Ив Кусто',
  itemNamePlaceholder: '',
  itemDescription: 'Исследователь океана',
  itemDescriptionPlaceholder: '',
  buttonName: 'Сохранить',
}

//                 *********** popup add form related ************

let addPopUp = document.querySelector('#popUpAdd');
let addForm = addPopUp.querySelector('.popup__form');
let addFormTitle = addPopUp.querySelector('.popup__title');
let addFormNameInput = addPopUp.querySelector('.popup__edit-line_field_name');
let addFormJobInput = addPopUp.querySelector('.popup__edit-line_field_description');
let addFormButtonSubmit = addPopUp.querySelector('.popup__button-submit');
let addFormButtonClose = addPopUp.querySelector('.popup__button-close');

let popUpAddFromDefault = {
  title: 'Новое место',
  itemName: '',
  itemNamePlaceholder: 'Название',
  itemDescription: '',
  itemDescriptionPlaceholder: 'Ссылка на картинку',
  buttonName: 'Создать',
}

//                 *********** popup picture related ************

let picturePopUp = document.querySelector('#popUpPicture');
let closePictureButton = picturePopUp.querySelector('.popup__button-close');

//                 *********** elements/crads related ************

let cards = document.querySelector('.elements');
let elementsTemplate = document.querySelector('#elementsItem').content;

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

// ************************************************ FUNCTIONS ************************************************

//                 *********** popup edit form related ************

function openEditPopUp () {
  // Без данного блока IF открытие PopUp также происходит плавно. В т/з сказано только о плавном закрытии.
  if (editPopUp.classList.contains('fading-element')) {
    editPopUp.classList.remove('transition');
    editPopUp.classList.remove('fading-element');
  }
  editFormTitle.textContent = popUpEditFromDefault.title;
  editFormNameInput.value = popUpEditFromDefault.itemName;
  editFormNameInput.placeholder = popUpEditFromDefault.itemNamePlaceholder;
  editFormJobInput.value = popUpEditFromDefault.itemDescription;
  editFormJobInput.placeholder = popUpEditFromDefault.itemDescriptionPlaceholder;
  editFormButtonSubmit.textContent = popUpEditFromDefault.buttonName;
  editPopUp.classList.add('popup_opened');
}

function closeEditPopUp () {
  editPopUp.classList.add('transition');
  editPopUp.classList.add('fading-element');
}

function buttonEditHandler (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = editFormNameInput.value;
  profileSubtitle.textContent = editFormJobInput.value;
  popUpEditFromDefault.itemName = editFormNameInput.value;
  popUpEditFromDefault.itemDescription = editFormJobInput.value;
  closeEditPopUp();
}

editButton.addEventListener('click', openEditPopUp);
editForm.addEventListener('submit', buttonEditHandler);
editFormButtonClose.addEventListener('click', closeEditPopUp);

//                 *********** popup add form related ************

function openAddPopUp () {
  // Без данного блока IF открытие PopUp также происходит плавно. В т/з сказано только о плавном закрытии.
  if (addPopUp.classList.contains('fading-element')) {
    addPopUp.classList.remove('transition');
    addPopUp.classList.remove('fading-element');
  }
  addFormTitle.textContent = popUpAddFromDefault.title;
  addFormNameInput.value = popUpAddFromDefault.itemName;
  addFormNameInput.placeholder = popUpAddFromDefault.itemNamePlaceholder;
  addFormJobInput.value = popUpAddFromDefault.itemDescription;
  addFormJobInput.placeholder = popUpAddFromDefault.itemDescriptionPlaceholder;
  addFormButtonSubmit.textContent = popUpAddFromDefault.buttonName;

  addFormNameInput.addEventListener('keydown', changingAddFormInput);
  addFormJobInput.addEventListener('keydown', changingAddFormInput);
  addFormNameInput.classList.add('popup__edit-line_placeholder');
  addFormJobInput.classList.add('popup__edit-line_placeholder');

  addPopUp.classList.add('popup_opened');
}

function closeAddPopUp () {
  addPopUp.classList.add('transition');
  addPopUp.classList.add('fading-element');
}

function changingAddFormInput () {
  addFormNameInput.classList.remove('popup__edit-line_placeholder');
  addFormJobInput.classList.remove('popup__edit-line_placeholder');
}

function buttonAddHandler (evt) {
  evt.preventDefault();
  let newElement = elementsTemplate.querySelector('.elements__item').cloneNode(true);
  newElement.querySelector('.elements__title').textContent = addFormNameInput.value;
  newElement.querySelector('.elements__picture').src = addFormJobInput.value;
  newElement.querySelector('.elements__picture').alt = addFormNameInput.value;
  newElement.querySelector('.elements__delete').addEventListener('click', deleteCard);
  newElement.querySelector('.elements__like').addEventListener('click', clickLike);

  newElement.querySelector('.elements__picture').onerror = function() {
    alert('Что-то не так со ссылкой на изображение :(');
    newElement.querySelector('.elements__picture').src = './images/elements-image-not-found.png';
  }

  cards.prepend(newElement);
  closeAddPopUp();
}

addButton.addEventListener('click', openAddPopUp);
addForm.addEventListener('submit', buttonAddHandler);
addFormButtonClose.addEventListener('click', closeAddPopUp);

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

function activateDefaultCards () {
  let index = 0;
  initialCards.forEach( function(card) {

    let newElement = elementsTemplate.querySelector('.elements__item').cloneNode(true);
    newElement.querySelector('.elements__title').textContent = initialCards[index].name;
    newElement.querySelector('.elements__picture').src = initialCards[index].link;
    newElement.querySelector('.elements__picture').alt = 'Изображение: ' + initialCards[index].name;
    newElement.querySelector('.elements__picture').addEventListener('click', openPicture);
    newElement.querySelector('.elements__delete').addEventListener('click', deleteCard);
    newElement.querySelector('.elements__like').addEventListener('click', clickLike);

    cards.append(newElement);
    console.log(index);
    console.log(newElement);
    console.log(newElement.querySelector('.elements__title').textContent);
    console.log(newElement.querySelector('.elements__picture').src);
    console.log(newElement.querySelector('.elements__picture').alt);
    index += 1;
  });
}

activateDefaultCards();