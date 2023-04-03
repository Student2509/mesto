// ************************************************ IMPORTS ************************************************

import {initialCards} from './cards.js';
import {Card} from './Card.js';
import {FormValidation} from './FormValidation.js';

// ************************************************ VARIABLES / CONSTANTS ************************************************

//                 *********** profile related ************

const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add'); 

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//                 *********** popup edit form related ************

const popUpEdit = document.querySelector('#popUpEdit');
const formEdit = popUpEdit.querySelector('.popup__form');
//const formEditTitle = popUpEdit.querySelector('.popup__title');
const formEditNameInput = popUpEdit.querySelector('.popup__edit-line_field_name');
const formEditJobInput = popUpEdit.querySelector('.popup__edit-line_field_description');
const formEditButtonSubmit = popUpEdit.querySelector('.popup__button-submit');
const formEditButtonClose = popUpEdit.querySelector('.popup__button-close');

//                 *********** popup add form related ************

const popUpAdd = document.querySelector('#popUpAdd');
const formAdd = popUpAdd.querySelector('.popup__form');
//const formAddTitle = popUpAdd.querySelector('.popup__title');
const formAddNameInput = popUpAdd.querySelector('.popup__edit-line_field_name');
const formAddLinkInput = popUpAdd.querySelector('.popup__edit-line_field_description');
const formAddButtonSubmit = popUpAdd.querySelector('.popup__button-submit');
const formAddButtonClose = popUpAdd.querySelector('.popup__button-close');

//                 *********** popup picture related ************

// const popUpPicture = document.querySelector('#popUpPicture');
// const buttonClosePicture = popUpPicture.querySelector('.popup__button-close');

//                 *********** elements/cards related ************

const cardsContainer = document.querySelector('.elements');
//const elementsTemplate = document.querySelector('#elementsItem').content;

// ************************************************ FUNCTIONS ************************************************

//                 *********** popup edit / add related ************

function openPopUp(popup) {
  document.addEventListener('keydown', handleCloseByEsc);
  popup.classList.add('popup_opened');
}

function closePopUp(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleCloseByEsc);
}

function handleButtonEdit (evt) {
  evt.preventDefault();
  profileTitle.textContent = formEditNameInput.value;
  profileSubtitle.textContent = formEditJobInput.value;
  closePopUp(popUpEdit);
}

function handleButtonAdd (evt) {
  evt.preventDefault();
  const card = {name: formAddNameInput.value, link: formAddLinkInput.value};
  const newElement = new Card(card, '.elements-template').createCard();
  // const newElement = createCard(formAddNameInput.value, formAddLinkInput.value);
  formAddNameInput.value = '';
  formAddLinkInput.value = '';

  cardsContainer.prepend(newElement);
  closePopUp(popUpAdd);
}

function handleCloseByEsc (evt) {
  if (evt.key === 'Escape') {
    closePopUp(getActivePopUp());
  }
}

function handleCloseByClickOutside (evt) {
  if (evt.target.classList.contains('popup')) {
    closePopUp(evt.target);
  }
}

function getActivePopUp () {
  return document.querySelector('.popup_opened');
}

popUpEdit.addEventListener('click', handleCloseByClickOutside);
buttonEdit.addEventListener('click', () => {
  formEditNameInput.value = profileTitle.textContent;
  formEditJobInput.value = profileSubtitle.textContent;
  formEditButtonSubmit.disabled = false;
  formEditButtonSubmit.classList.remove('popup__button-submit_non-active');
  openPopUp(popUpEdit);
});
formEdit.addEventListener('submit', handleButtonEdit);
formEditButtonClose.addEventListener('click', () => {closePopUp(popUpEdit);});

popUpAdd.addEventListener('click', handleCloseByClickOutside);
buttonAdd.addEventListener('click', () => {
  formAddNameInput.value = '';
  formAddLinkInput.value = '';
  formAddButtonSubmit.disabled = true;
  formAddButtonSubmit.classList.add('popup__button-submit_non-active');
  openPopUp(popUpAdd);
});
formAdd.addEventListener('submit', handleButtonAdd);
formAddButtonClose.addEventListener('click', () => {closePopUp(popUpAdd);});

//                 *********** popup picture related ************

// function openPicture(title, image) {
//   popUpPicture.querySelector('.popup__image-picture').src = image;
//   popUpPicture.querySelector('.popup__image-title').textContent = title;
//   popUpPicture.querySelector('.popup__image-picture').alt = 'Изображение: ' + title;
//   openPopUp(popUpPicture);
// }

// popUpPicture.addEventListener('click', handleCloseByClickOutside);
// buttonClosePicture.addEventListener('click', () => {closePopUp(popUpPicture);});

//                 *********** elements related ************

// function clickButtonLike (evt) {
//   evt.preventDefault();
//   const buttonLike = evt.target;
//   buttonLike.classList.toggle('elements__like-active');
// }

// function deleteCard (evt) {
//   const deleteButton = evt.target;
//   const elementItem = deleteButton.closest('.elements__item');
//   elementItem.remove();
// }

// function createCard (title, image) {
//   const newCard = elementsTemplate.querySelector('.elements__item').cloneNode(true);
//   const picture = newCard.querySelector('.elements__picture');
//   picture.src = image;
//   picture.alt = 'Изображение: ' + title;
//   newCard.querySelector('.elements__title').textContent = title;
//   picture.addEventListener('click', () => openPicture(title, image));
//   newCard.querySelector('.elements__delete').addEventListener('click', deleteCard);
//   newCard.querySelector('.elements__like').addEventListener('click', clickButtonLike);

//   return newCard;
// }

// function activateDefaultCards () {
//   initialCards.forEach( function(card) {
//     const newElement = createCard(card.name, card.link);
//     cardsContainer.append(newElement);
//   });
// }

// activateDefaultCards();


// ************************************ MAIN ************************************

function activateDefaultCards () {
  initialCards.forEach( function(card) {
    const newElement = (new Card(card, '.elements-template')).createCard();
    cardsContainer.append(newElement);
  });
}

activateDefaultCards();

const formValidationSettings = 
  {
    formSelector: '.popup__form',
    inputSelector: '.popup__edit-line',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_non-active',
    inputErrorClass: 'popup__edit-line_incorrect',
    errorClass: 'popup__edit-line-error'
  };  

const editFormValidation = new FormValidation(formValidationSettings, formEdit);
const addFormValidation = new FormValidation(formValidationSettings, formAdd);

editFormValidation.enableValidation();
addFormValidation.enableValidation();