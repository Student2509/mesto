// ************************************************ IMPORTS ************************************************
import './index.css';
import {
  buttonEdit,
  buttonAdd,
  buttonEditAvatar,
  formEdit,
  formEditNameInput,
  formEditJobInput,
  formAdd,
  formAvatar,
  cardsContainerSelector,
  formValidationSettings,
  tokenNumber,
  cohortNumber,
  apiURL
  } from '../scripts/utils/constants.js';
import Card from '../scripts/components/Card.js';
import {FormValidation} from '../scripts/components/FormValidation.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Api from '../scripts/components/Api';

// ************************************ MAIN ************************************

// ---------- API ----------

const api = new Api(tokenNumber, cohortNumber, apiURL);

// ---------- Validation ----------

const editFormValidation = new FormValidation(formValidationSettings, formEdit);
const addFormValidation = new FormValidation(formValidationSettings, formAdd);
const avatarFormValidation = new FormValidation(formValidationSettings, formAvatar);

editFormValidation.enableValidation();
addFormValidation.enableValidation();
avatarFormValidation.enableValidation();

// ---------- Section ----------

const section = new Section(
  {
    //items: someInitCards.reverse(),    // items: initialCards.reverse(), 
    renderer: (card) => {
      const newCard = createCard(card);
      section.addItem(newCard);
    }
  }, 
  cardsContainerSelector
);

// ---------- User Info / Profile ----------

const profile = new UserInfo({
  nameSelector: '.profile__title', 
  descriptionSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
});

// ---------- Initialization ----------

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then( (res) => {
    const userData = res[0];
    const initCards = res[1];

    profile.setUserInfo ({
      name: userData.name,
      description: userData.about,
      avatar: userData.avatar
    });
    profile.id = userData._id;
    // console.log(initCards);
    section.renderItems(initCards);
  })
  .catch(err => console.log(`Ошибка: ${err}`))

// ---------- Popup: edit profile ----------

const popupForProfile = new PopupWithForm(
  '#popUpEdit', 
  (evt, inputValues) => {
    evt.preventDefault();
    popupForProfile.toggleAwaitingState();
    api.editProfileInfo({name: inputValues.name, about: inputValues.description})
      .then( (data) => {
        console.log(data);
        profile.setUserInfo({name: data.name, description: data.about, avatar: data.avatar}); 
        popupForProfile.close();
      })
      .catch( err => console.log(`Ошибка: ${err}`))
      .finally(popupForProfile.toggleAwaitingState())
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
    popupForAddingCard.toggleAwaitingState();
    api.addCard({newName: inputValues.name, newLink: inputValues.description})
      .then( data => {
        // console.log(data);
        // const newElement = createCard({name: data.name, link: data.link});
        const newElement = createCard(data);
        section.addItem(newElement);
        popupForAddingCard.close();
      })
      .catch( err => console.log(`Ошибка: ${err}`))
      .finally(popupForAddingCard.toggleAwaitingState())    
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

// ---------- Popup: delete card ----------

const popupForDeletingCard = new PopupWithForm(
  '#popUpDelete',
  (evt) => {
    evt.preventDefault();
  }
);

// ---------- Popup: changing avatar ----------

const popupForChangingAvatar = new PopupWithForm(
  '#popUpAvatar',
  (evt, userInfo) => {
    evt.preventDefault();
    console.log(`UserInfo from popupForChangingAvatar: ${userInfo}`);
    popupForChangingAvatar.toggleAwaitingState();
    api.setUserAvatar({
      avatar: userInfo.avatar
    })
      .then((data) => {
        profile.setUserInfo({
          name: data.name,
          description: data.about,
          avatar: data.avatar
        });
        popupForChangingAvatar.close();
      })
      .catch( err => console.log(`Ошибка: ${err}`))
      .finally(popupForChangingAvatar.toggleAwaitingState())
  }
);

popupForChangingAvatar.setEventListeners();

buttonEditAvatar.addEventListener('click', () => {
  popupForChangingAvatar.open();
})

// ---------- Utils ----------

function createCard(card) {
  const newCard = (new Card(
    card,
    '.elements__template', 
    //popupForImage.open    /* не может найти метод open */
    openPicture,
    api.likeCard.bind(api), //  передаём чем отправляем запрос на "лайк" на сервер
    api.deleteCard.bind(api), //  передаём чем отправляем запрос на "удалить" на сервер
    popupForDeletingCard.open.bind(popupForDeletingCard), //  передаём чем открываем попап
    popupForDeletingCard.close.bind(popupForDeletingCard), //  передаём чем закрываем попап
    popupForDeletingCard.setEventListeners.bind(popupForDeletingCard) //  передаём чем и как обрабатываем сабмит (нажатие "ОК")
  ));
  const newCardElement = newCard.generate();

  if (card.owner._id === profile.id) {
    newCard.enableDeleteButton();
  }

  if (card.likes.some((card) => {card._id === profile.id})) {
    newCard.showActiveLikes();
  }

  return newCardElement;
}

function openPicture(title, image) {
  popupForImage.open(image, title);
}
