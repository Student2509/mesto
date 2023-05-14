export default class Card {

  constructor({card, templateSelector, 
    handleClick,
    handleDelete,
    handleLike,
    userId
    }) {
    this._card = card;
    this._templateSelector = templateSelector;
    this._handleClick = handleClick;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
    this._userId = userId;
    // ----- генерируются за пределами конструктора: -----
    //  this._elementItem;
    //  this._elementItemPicture
    //  this.likesElement
    //  this._isLike
  }

  deleteCard() {
    this._elementItem.remove();
  }

  _setDeleteButtonStatus() {
    if (this._card.owner._id === this._userId) {
      this._elementItem.querySelector('.elements__delete').classList.remove('elements__delete_disabled');
    }
  }

  _checkOwnLikes() {
    this._toggleLikeStatus(this._hasOwnLike());
  }

  _toggleLikeStatus(isLiked) {
    if (isLiked) {
      this._likeButton.classList.add('elements__like-active');
    } else {
      this._likeButton.classList.remove('elements__like-active');
    }
  }

  _hasOwnLike() {
    this._isLiked = this._card.likes.some((user) => {return user._id === this._userId})
    return this._isLiked;
  }  

  setLikes(likes) { // принимаем массив пользователей card.likes
    this._card.likes = likes;
    this._likesElement.textContent = likes.length;
    this._checkOwnLikes();
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
    this._elementItem.querySelector('.elements__like').addEventListener('click', () => {
      this._handleLike(this._isLiked, this);
    });
    this._elementItem.querySelector('.elements__delete').addEventListener('click', () => {
      this._handleDelete(this._card._id, this);
    });
  }

  generate() {
    this._elementItem = this._getTemplate();
    this._elementItemPicture = this._elementItem.querySelector('.elements__picture');
    this._elementItemPicture.src = this._card.link;
    this._elementItemPicture.alt = 'Изображение: ' + this._card.name;
    this._elementItem.querySelector('.elements__title').textContent = this._card.name;
    this._likeButton = this._elementItem.querySelector('.elements__like');
    this._likesElement = this._elementItem.querySelector('.elements__like-count');
    this._likesElement.textContent = this._card.likes ? this._card.likes.length : 0;
    this._isLiked = this._hasOwnLike();
    this._setDeleteButtonStatus();
    this._checkOwnLikes();
    this._setEventListeners();
  
    return this._elementItem;
  }

}