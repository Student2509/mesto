// ************************************************ VARIABLES / CONSTANTS ************************************************

//                 *********** profile related ************

export const buttonEdit = document.querySelector('.profile__button-edit');
export const buttonAdd = document.querySelector('.profile__button-add');
export const buttonEditAvatar = document.querySelector('.profile__change-avatar');

//                 *********** popup edit form related ************

export const popUpEdit = document.querySelector('#popUpEdit');
export const formEdit = popUpEdit.querySelector('.popup__form');
export const formEditNameInput = popUpEdit.querySelector('.popup__edit-line_field_name');
export const formEditJobInput = popUpEdit.querySelector('.popup__edit-line_field_description');

//                 *********** popup add form related ************

export const popUpAdd = document.querySelector('#popUpAdd');
export const formAdd = popUpAdd.querySelector('.popup__form');

//                 *********** popup picture related ************

export const popUpPicture = document.querySelector('#popUpPicture');

//                 *********** popup avatar related ************

export const popUpAvatar = document.querySelector('#popUpAvatar');
export const formAvatar = popUpAvatar.querySelector('.popup__form');

//                 *********** elements/cards related ************

export const cardsContainerSelector = '.elements';

export const initialCards = [
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

export const formValidationSettings = 
  {
    formSelector: '.popup__form',
    inputSelector: '.popup__edit-line',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_non-active',
    inputErrorClass: 'popup__edit-line_incorrect',
    errorClass: 'popup__edit-line-error'
  };

export const tokenNumber = 'b21d8a3b-b2ca-438c-885d-b991cee86b64';
export const cohortNumber = 'cohort-65';
export const apiURL = 'https://mesto.nomoreparties.co/v1/';