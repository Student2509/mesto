// ************************************************ IMPORTS ************************************************
import './index.css';
import {
  buttonEdit,
  buttonAdd,
  formEdit,
  formEditNameInput,
  formEditJobInput,
  formAdd,
  popUpPicture,
  cardsContainerSelector,
  initialCards, 
  formValidationSettings
  } from '../scripts/utils/constants.js';
import Card from '../scripts/components/Card.js';
import {FormValidation} from '../scripts/components/FormValidation.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';

// ************************************ MAIN ************************************

// ---------- Validation ----------

const editFormValidation = new FormValidation(formValidationSettings, formEdit);
const addFormValidation = new FormValidation(formValidationSettings, formAdd);

editFormValidation.enableValidation();
addFormValidation.enableValidation();

// ---------- Section ----------

const section = new Section(
  {
    items: initialCards.reverse(), 
    renderer: (card) => {
      const newCard = createCard(card);
      section.addItem(newCard);
    }
  }, 
  cardsContainerSelector
);

section.renderItems();

// ---------- User Info / Profile ----------

const profile = new UserInfo({
  nameSelector: '.profile__title', 
  descriptionSelector: '.profile__subtitle'
});

// ---------- Popup: edit profile ----------

const popupForProfile = new PopupWithForm(
  '#popUpEdit', 
  (evt, inputValues) => {
    evt.preventDefault();
    profile.setUserInfo({name: inputValues.name, description: inputValues.description});
    popupForProfile.close();
  }
);

popupForProfile.setEventListeners();

buttonEdit.addEventListener('click', () => {
  const {profileTitle: title, profileSubtitle: subtitle} = profile.getUserInfo();
  formEditNameInput.value = title;
  formEditJobInput.value = subtitle;
  editFormValidation.toggleButtonState();
  popupForProfile.open();
});

// ---------- Popup: add card ----------

const popupForAddingCard = new PopupWithForm(
  '#popUpAdd', 
  (evt, inputValues) => {
    evt.preventDefault();
    const newElement = createCard({name: inputValues.name, link: inputValues.description});
    section.addItem(newElement); 
    popupForAddingCard.close();
  }
);

popupForAddingCard.setEventListeners();

buttonAdd.addEventListener('click', () => {
  addFormValidation.toggleButtonState();
  popupForAddingCard.open();
})

// ---------- Popup: open card ----------

const popupForImage = new PopupWithImage('#popUpPicture');

popupForImage.setEventListeners();

// ---------- Utils ----------

function createCard(card) {
  return (new Card(
    {name: card.name, link: card.link}, 
    '.elements__template', 
    //popupForImage.open    /* не может найти метод open */
    openPicture
  )).generate();
}

function openPicture(title, image) {
  popupForImage.open(image, title);
}