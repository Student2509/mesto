export default class Card {

  constructor({card, templateSelector, 
    handleClick,
    handleDelete,
    handleLike
    // clickLike, 
    // clickDelete, 
    // openCardPopup, 
    // closeCardPopup, 
    // pressConfirm
    /*,
  isOwner*/}) {
    this._card = card;
    this._templateSelector = templateSelector;
    this._handleClick = handleClick;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
    this._ownerId = '';
    // this._clickLike = clickLike;
    // this._clickDelete = clickDelete;
    // this._openCardPopup = openCardPopup;
    // this._closeCardPopup = closeCardPopup;
    // this._pressConfirm = pressConfirm;
    // this._isOwner = isOwner;
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

  // _handleCardDelete(evt) {
  //   // console.log('entering _handleCardDelete of Card');
  //   this._clickDelete(this._card._id)
  //     .then(npc => {
  //       evt.target.closest('.elements__item').remove();
  //       this._closeCardPopup();
  //     })
  //     .catch(err => console.log(`Ошибка: ${err}`))
  // }

  // deleteCard(evt) {
  //   evt.target.closest('.elements__item').remove();
  // }

  // _handleCardLike(evt) {
  //   const isLiked = evt.target.classList.contains('elements__like-active');
  //   this._clickLike(this._card._id, isLiked)
  //     .then((card) => {
  //       let result = 0;
  //       if (card.likes) {
  //         result = card.likes.length;
  //       } else {
  //         result = 0;
  //       }
  //       this._likesElement.textContent = result;
  //       evt.target.classList.toggle('elements__like-active');
  //     })
  //     .catch(err => console.log(`Ошибка: ${err}`))
  // }

  _enableDeleteButton() {
    this._elementItem.querySelector('.elements__delete').classList.remove('elements__delete_disabled');
  }

  _showActiveLikes() {
    const likeButton = this._elementItem.querySelector('.elements__like');
    if (!likeButton.classList.contains('elements__like-active')) {
      likeButton.classList.add('elements__like-active');
    }
  }

  setOwnerId(userId) {
    this._ownerId = userId;
  }

  _checkOwner() {
    if (this._card.owner._id === this._ownerId) {
      this._enableDeleteButton();
    }
  
    if (this._card.likes.some((card) => {card._id === this._ownerId})) {
      this._showActiveLikes();
    }
  }

  setLikes(likes) {
    this._likesElement.textContent = likes;
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
        this._handleClick(this._card.name, this._card.link);
    });
    this._elementItem.querySelector('.elements__like').addEventListener('click', (evt) => {
      this._handleLike(evt, this);
    });
    this._elementItem.querySelector('.elements__delete').addEventListener('click', (evt) => {
      this._handleDelete(evt, this._card._id);
      // console.log('Card._setEventListeners', this);
    });
  }

  generate() {
    // console.log('enter generate');
    this._elementItem = this._getTemplate();
    this._elementItemPicture = this._elementItem.querySelector('.elements__picture');
    this._elementItemPicture.src = this._card.link;
    this._elementItemPicture.alt = 'Изображение: ' + this._card.name;
    this._elementItem.querySelector('.elements__title').textContent = this._card.name;
    this._likesElement = this._elementItem.querySelector('.elements__like-count');
    this._likesElement.textContent = this._card.likes ? this._card.likes.length : 0;
    this._checkOwner(); // если метод setOwnerId не вызывался до generate, то проверка просто пропустится в теле _checkOwner
                        // и карточка автоматически будет отрисована как карточка другого пользователя
    this._setEventListeners();
  
    return this._elementItem;
  }

}