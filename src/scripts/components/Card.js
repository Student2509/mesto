export default class Card {

  constructor(card, templateSelector, handleCardClick, 
    clickLike, 
    clickDelete, 
    openCardPopup, 
    closeCardPopup, 
    pressConfirm) {
    this._card = card;
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._clickLike = clickLike; // comes from Api
    this._clickDelete = clickDelete; // comes from Api
    this._openCardPopup = openCardPopup; // comes from Popup
    this._closeCardPopup = closeCardPopup; // comes from Popup
    this._pressConfirm = pressConfirm; // comes from Popup
    // ----- генерируются за пределами конструктора: -----
    //  this._elementItem;
    //  this._elementItemPicture
    //  this._likes
  }

  // _clickButtonLike(evt) {
  //   evt.preventDefault();
  //   const buttonLike = evt.target;
  //   buttonLike.classList.toggle('elements__like-active');
  // }

  _handleCardDelete(evt) {
    // console.log('entering _handleCardDelete of Card');
    this._clickDelete(this._card._id)
      .then(npc => {
        evt.target.closest('.elements__item').remove();
        this._closeCardPopup();
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }

  _handleCardLike(evt) {
    // console.log('entering _handleCardLike of Card');
    const isLiked = evt.target.classList.contains('elements__like-active');
    this._clickLike(this._card._id, isLiked)
      .then((card) => {
        let result = 0;
        if (card.likes) {
          result = card.likes.length;
        } else {
          result = 0;
        }
        this._likesElement.textContent = result;
        evt.target.classList.toggle('elements__like-active');
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }

  enableDeleteButton() {
    this._elementItem.querySelector('.elements__delete').classList.remove('elements__delete_disabled');
  }

  showActiveLikes() {
    const likeButton = this._elementItem.querySelector('.elements__like');
    if (!likeButton.classList.contains('elements__like-active')) {
      likeButton.classList.add('elements__like-active');
    }
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._elementItemPicture.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
    });
    this._elementItem.querySelector('.elements__like').addEventListener('click', evt => {this._handleCardLike(evt)});
    this._elementItem.querySelector('.elements__delete').addEventListener('click', (cardEvent) => {
      this._openCardPopup();
      this._pressConfirm((innerEvent) => {
        innerEvent.preventDefault();
        this._handleCardDelete(cardEvent);
      });
    });
  }

  generate() {
    this._elementItem = this._getTemplate();
    this._elementItemPicture = this._elementItem.querySelector('.elements__picture');
    this._elementItemPicture.src = this._link;
    this._elementItemPicture.alt = 'Изображение: ' + this._name;
    this._elementItem.querySelector('.elements__title').textContent = this._name;
    this._likesElement = this._elementItem.querySelector('.elements__like-count');
    this._likesElement.textContent = this._card.likes ? this._card.likes.length : 0;
    // this._likes = this._likesElement.textContent;
    this._setEventListeners();
  
    return this._elementItem;
  }

}