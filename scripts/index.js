// ************************************************ IMPORTS ************************************************

import {initialCards} from './constants.js';
import {formValidationSettings} from './constants.js';
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
const formEditNameInput = popUpEdit.querySelector('.popup__edit-line_field_name');
const formEditJobInput = popUpEdit.querySelector('.popup__edit-line_field_description');
const formEditButtonSubmit = popUpEdit.querySelector('.popup__button-submit');
const formEditButtonClose = popUpEdit.querySelector('.popup__button-close');

//                 *********** popup add form related ************

const popUpAdd = document.querySelector('#popUpAdd');
const formAdd = popUpAdd.querySelector('.popup__form');
const formAddNameInput = popUpAdd.querySelector('.popup__edit-line_field_name');
const formAddLinkInput = popUpAdd.querySelector('.popup__edit-line_field_description');
const formAddButtonSubmit = popUpAdd.querySelector('.popup__button-submit');
const formAddButtonClose = popUpAdd.querySelector('.popup__button-close');

//                 *********** popup picture related ************

const popUpPicture = document.querySelector('#popUpPicture');
const buttonClosePicture = popUpPicture.querySelector('.popup__button-close');

//                 *********** elements/cards related ************

const cardsContainer = document.querySelector('.elements');

//                 *********** validation related ************

const editFormValidation = new FormValidation(formValidationSettings, formEdit);
const addFormValidation = new FormValidation(formValidationSettings, formAdd);

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

function handleSubmitEdit (evt) {
  evt.preventDefault();
  profileTitle.textContent = formEditNameInput.value;
  profileSubtitle.textContent = formEditJobInput.value;
  closePopUp(popUpEdit);
}

function handleSubmitAdd (evt) {
  evt.preventDefault();
  const newElement = createCard(formAddNameInput.value, formAddLinkInput.value);
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
  editFormValidation.toggleButtonState();
  openPopUp(popUpEdit);
});
formEdit.addEventListener('submit', handleSubmitEdit);
formEditButtonClose.addEventListener('click', () => {closePopUp(popUpEdit);});

popUpAdd.addEventListener('click', handleCloseByClickOutside);
buttonAdd.addEventListener('click', () => {
  formAdd.reset();
  addFormValidation.toggleButtonState();
  openPopUp(popUpAdd);
});
formAdd.addEventListener('submit', handleSubmitAdd);
formAddButtonClose.addEventListener('click', () => {closePopUp(popUpAdd);});

//                 *********** popup picture related ************

function openPicture(title, image) {
  popUpPicture.querySelector('.popup__image-picture').src = image;
  popUpPicture.querySelector('.popup__image-title').textContent = title;
  popUpPicture.querySelector('.popup__image-picture').alt = 'Изображение: ' + title;
  openPopUp(popUpPicture);
}

popUpPicture.addEventListener('click', handleCloseByClickOutside);
buttonClosePicture.addEventListener('click', () => {closePopUp(popUpPicture);});

//                 *********** elements related ************

function createCard(cardName, cardLink) {
  return (new Card({name: cardName, link: cardLink}, '.elements-template', openPicture)).generate();
}

function activateDefaultCards () {
  initialCards.forEach( function(card) {
    const newElement = createCard(card.name, card.link);
    cardsContainer.append(newElement);
  });
}

// ************************************ MAIN ************************************

activateDefaultCards();

editFormValidation.enableValidation();
addFormValidation.enableValidation();