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
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation';

// ************************************ MAIN ************************************

// ---------- API ----------

const api = new Api(tokenNumber, cohortNumber, apiURL);

// ---------- Validation ----------

const formEditValidation = new FormValidation(formValidationSettings, formEdit);
const formAddValidation = new FormValidation(formValidationSettings, formAdd);
const formAvatarValidation = new FormValidation(formValidationSettings, formAvatar);

formEditValidation.enableValidation();
formAddValidation.enableValidation();
formAvatarValidation.enableValidation();

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
    profile.setUserId(userData._id);
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
      .finally(popupForProfile.toggleAwaitingState());  // finally срабатыыает быстро. Если этот блок убрать, 
                                                        // то изменение статуса кнопки будет заметно
  }
);

popupForProfile.setEventListeners();

buttonEdit.addEventListener('click', () => {
  const {profileTitle: title, profileSubtitle: subtitle} = profile.getUserInfo();
  formEditNameInput.value = title;
  formEditJobInput.value = subtitle;
  formEditValidation.toggleButtonState();
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
        const newElement = createCard(data);
        section.addItem(newElement);
        popupForAddingCard.close();
      })
      .catch( err => console.log(`Ошибка: ${err}`))
      .finally(popupForAddingCard.toggleAwaitingState());
      // .finally(setTimeout(popupForAddingCard.toggleAwaitingState, 1000))
  }
);

popupForAddingCard.setEventListeners();

buttonAdd.addEventListener('click', () => {
  formAddValidation.toggleButtonState();
  popupForAddingCard.open();
})

// ---------- Popup: open card ----------

const popupForImage = new PopupWithImage('#popUpPicture');

popupForImage.setEventListeners();

// ---------- Popup: delete card ----------

const popupForDeletingCard = new PopupWithConfirmation(
  '#popUpDelete',
  (evt) => {
    evt.preventDefault();
  }
);

popupForDeletingCard.setEventListeners();

// ---------- Popup: changing avatar ----------

const popupForChangingAvatar = new PopupWithForm(
  '#popUpAvatar',
  (evt, userInfo) => {
    evt.preventDefault();
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
        formAvatarValidation.toggleButtonState();
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

  const newCard = new Card(
    {card: card,
    templateSelector: '.elements__template',
    handleClick: openPicture,
    handleDelete: 

    (evt) => {
      //console.log('step 1');
      evt.preventDefault();
      const removeCard = () => {
        //console.log('step 2');
        popupForDeletingCard.toggleAwaitingState();
            api.deleteCard(card._id)
              .then( () => {
                //console.log('step 3');
                evt.target.closest('.elements__item').remove();
                popupForDeletingCard.close();
                form.removeEventListener('submit', removeCard);
              })
              .catch(err => console.log(`Ошибка: ${err}`))
              .finally(popupForDeletingCard.toggleAwaitingState())
      }
      //console.log('step 4');
      popupForDeletingCard.open();
      const form = popupForDeletingCard.getForm();
      form.removeEventListener('submit', removeCard); // чтобы не плодить слушатели
      form.addEventListener('submit', removeCard);
    },

    handleLike: (evt, likes) => {
      const isLiked = evt.target.classList.contains('elements__like-active');
      api.likeCard(card._id, isLiked)
        .then((card) => {
          let result = 0;
          if (card.likes) {
            result = card.likes.length;
          } else {
            result = 0;
          }
          console.log(likes);
          likes.setLikes(result);
          evt.target.classList.toggle('elements__like-active');
        })
        .catch(err => console.log(`Ошибка: ${err}`))
    }
  });

  newCard.setOwnerId(profile.getUserId());
  return newCard.generate();
}

function openPicture(title, image) {
  popupForImage.open(image, title);
}

// const handleDel = (evt, cardId) => {
////   console.log('step 1');
//   evt.preventDefault();
//   const removeCard = () => {
////     console.log('step 2');
//     popupForDeletingCard.setAwaitingState();
//         api.deleteCard(cardId)
//           .then( () => {
////             console.log('step 3');
//             evt.target.closest('.elements__item').remove();
//             popupForDeletingCard.close();
//             form.removeEventListener('submit', removeCard);
//           })
//           .catch(err => console.log(`Ошибка: ${err}`))
//           .finally(popupForDeletingCard.setDefaultState())
//   }
////   console.log('step 4');
//   popupForDeletingCard.open();
//   const form = popupForDeletingCard.getForm();
//   form.removeEventListener('submit', removeCard); // чтобы не плодить слушатели
//   form.addEventListener('submit', removeCard);
// }