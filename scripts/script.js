
// ************************************************ VARIABLES / CONSTANTS ************************************************

//                 *********** profile related ************

const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add'); 

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//                 *********** popup edit form related ************

const popUpEdit = document.querySelector('#popUpEdit');
const formEdit = popUpEdit.querySelector('.popup__form');
const formEditTitle = popUpEdit.querySelector('.popup__title');
const formEditNameInput = popUpEdit.querySelector('.popup__edit-line_field_name');
const formEditJobInput = popUpEdit.querySelector('.popup__edit-line_field_description');
const formEditButtonSubmit = popUpEdit.querySelector('.popup__button-submit');
const formEditButtonClose = popUpEdit.querySelector('.popup__button-close');

//                 *********** popup add form related ************

const popUpAdd = document.querySelector('#popUpAdd');
const formAdd = popUpAdd.querySelector('.popup__form');
const formAddTitle = popUpAdd.querySelector('.popup__title');
const formAddNameInput = popUpAdd.querySelector('.popup__edit-line_field_name');
const formAddJobInput = popUpAdd.querySelector('.popup__edit-line_field_description');
const formAddButtonSubmit = popUpAdd.querySelector('.popup__button-submit');
const formAddButtonClose = popUpAdd.querySelector('.popup__button-close');

//                 *********** popup picture related ************

const popUpPicture = document.querySelector('#popUpPicture');
const buttonClosePicture = popUpPicture.querySelector('.popup__button-close');

//                 *********** elements/cards related ************

const cardsContainer = document.querySelector('.elements');
const elementsTemplate = document.querySelector('#elementsItem').content;
let currentCard;


// ************************************************ FUNCTIONS ************************************************

//                 *********** popup edit form related ************

function openPopUpEdit () {
  formEditNameInput.value = profileTitle.textContent;
  formEditJobInput.value = profileSubtitle.textContent;
  popUpEdit.classList.add('popup_opened');
}

function closePopUpEdit () {
  popUpEdit.classList.remove('popup_opened');
}

function buttonEditHandler (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = formEditNameInput.value;
  profileSubtitle.textContent = formEditJobInput.value;
  closePopUpEdit();
}

buttonEdit.addEventListener('click', openPopUpEdit);
formEdit.addEventListener('submit', buttonEditHandler);
formEditButtonClose.addEventListener('click', closePopUpEdit);

//                 *********** popup add form related ************

function openPopUpAdd () {
  formAddNameInput.addEventListener('keydown', changingFormAddInput);
  formAddJobInput.addEventListener('keydown', changingFormAddInput);
  formAddNameInput.classList.add('popup__edit-line_placeholder');
  formAddJobInput.classList.add('popup__edit-line_placeholder');

  popUpAdd.classList.add('popup_opened');
}

function closePopUpAdd () {
  popUpAdd.classList.remove('popup_opened');
}

function changingFormAddInput () {
  formAddNameInput.classList.remove('popup__edit-line_placeholder');
  formAddJobInput.classList.remove('popup__edit-line_placeholder');
}

function buttonAddHandler (evt) {
  evt.preventDefault();
  const newElement = createCard();
  currentCard = newElement;
  newElement.querySelector('.elements__title').textContent = formAddNameInput.value;
  newElement.querySelector('.elements__picture').src = formAddJobInput.value;
  newElement.querySelector('.elements__picture').alt = formAddNameInput.value;
  newElement.querySelector('.elements__delete').addEventListener('click', deleteCard);
  newElement.querySelector('.elements__like').addEventListener('click', clickLike);
  newElement.querySelector('.elements__picture').addEventListener('click', openPicture);
  newElement.querySelector('.elements__picture').addEventListener('error', setDefaultImage);

  formAddNameInput.value = '';
  formAddJobInput.value = '';

  cardsContainer.prepend(newElement);
  closePopUpAdd();
}

buttonAdd.addEventListener('click', openPopUpAdd);
formAdd.addEventListener('submit', buttonAddHandler);
formAddButtonClose.addEventListener('click', closePopUpAdd);

//                 *********** popup picture related ************

function openPicture(evt) {
  evt.preventDefault();
  const picture = evt.target;
  const pictureAdress = picture.src;
  const pictureTitleElement = picture.nextElementSibling;
  const pictureTitle = pictureTitleElement.querySelector('.elements__title').textContent;
  popUpPicture.querySelector('.popup__image-picture').src = pictureAdress;
  popUpPicture.querySelector('.popup__image-title').textContent = pictureTitle;
  popUpPicture.querySelector('.popup__image-picture').alt = pictureTitle;
  popUpPicture.classList.add('transition');
  popUpPicture.classList.add('popup_opened');
}

function closePopUpPicture () {
  popUpPicture.classList.remove('popup_opened');
}

buttonClosePicture.addEventListener('click', closePopUpPicture);

//                 *********** elements related ************

function clickLike (evt) {
  evt.preventDefault();
  const buttonLike = evt.target;
  buttonLike.classList.toggle('elements__like-active');
}

function deleteCard (evt) {
  const deleteButton = evt.target;
  const elementItem = deleteButton.closest('.elements__item');
  elementItem.remove();
}

function createCard () {
  return elementsTemplate.querySelector('.elements__item').cloneNode(true);
}

function setDefaultImage() {
  alert('Что-то не так со ссылкой на изображение :(');
  currentCard.querySelector('.elements__picture').src = './images/elements-image-not-found.png';
}

function activateDefaultCards () {
  let index = 0;
  initialCards.forEach( function(card) {

    const newElement = createCard();
    newElement.querySelector('.elements__title').textContent = initialCards[index].name;
    newElement.querySelector('.elements__picture').src = initialCards[index].link;
    newElement.querySelector('.elements__picture').alt = 'Изображение: ' + initialCards[index].name;
    newElement.querySelector('.elements__picture').addEventListener('click', openPicture);
    newElement.querySelector('.elements__delete').addEventListener('click', deleteCard);
    newElement.querySelector('.elements__like').addEventListener('click', clickLike);

    cardsContainer.append(newElement);
    index += 1;
  });
}

activateDefaultCards();