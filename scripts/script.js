
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

// ************************************************ FUNCTIONS ************************************************

//                 *********** popup edit / add related ************

function openPopUp(popup) {
  popup.classList.add('popup_opened');
}

function closePopUp(popup) {
  popup.classList.remove('popup_opened');
}

function handleButtonEdit (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = formEditNameInput.value;
  profileSubtitle.textContent = formEditJobInput.value;
  closePopUp(popUpEdit);
}

function handleButtonAdd (evt) {
  evt.preventDefault();
  const newElement = createCard(formAddNameInput.value, formAddJobInput.value);
  // picture.addEventListener('error', function() {
  //   alert('Что-то не так со ссылкой на изображение :(');
  //   picture.src = './images/elements-image-not-found.png';
  // });
  formAddNameInput.value = '';
  formAddJobInput.value = '';

  cardsContainer.prepend(newElement);
  closePopUp(popUpAdd);
}

buttonEdit.addEventListener('click', () => {
  formEditNameInput.value = profileTitle.textContent;
  formEditJobInput.value = profileSubtitle.textContent;
  openPopUp(popUpEdit);
});
formEdit.addEventListener('submit', handleButtonEdit);
formEditButtonClose.addEventListener('click', () => {closePopUp(popUpEdit);});

buttonAdd.addEventListener('click', () => {openPopUp(popUpAdd);});
formAdd.addEventListener('submit', handleButtonAdd);
formAddButtonClose.addEventListener('click', () => {closePopUp(popUpAdd);});

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
  openPopUp(popUpPicture);
}

buttonClosePicture.addEventListener('click', () => {closePopUp(popUpPicture);});

//                 *********** elements related ************

function clickButtonLike (evt) {
  evt.preventDefault();
  const buttonLike = evt.target;
  buttonLike.classList.toggle('elements__like-active');
}

function deleteCard (evt) {
  const deleteButton = evt.target;
  const elementItem = deleteButton.closest('.elements__item');
  elementItem.remove();
}

function createCard (title, image) {
  const newCard = elementsTemplate.querySelector('.elements__item').cloneNode(true);
  const picture = newCard.querySelector('.elements__picture');
  picture.src = image; //formAddJobInput.value;
  picture.alt = 'Изображение: ' + title; //formAddNameInput.value;
  newCard.querySelector('.elements__title').textContent = title; // formAddNameInput.value;
  picture.addEventListener('click', openPicture);
  newCard.querySelector('.elements__delete').addEventListener('click', deleteCard);
  newCard.querySelector('.elements__like').addEventListener('click', clickButtonLike);

  return newCard;
}

function activateDefaultCards () {
  initialCards.forEach( function(card) {
    const newElement = createCard(card.name, card.link);
    cardsContainer.append(newElement);
  });
}

activateDefaultCards();