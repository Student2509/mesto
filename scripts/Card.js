export class Card {

  constructor(card, templateSelector) {
    this._title = card.name;
    this._image = card.link;
    this._templateSelector = templateSelector;
    this._popup = document.querySelector('#popUpPicture');
    this._popUpButtonClose = this._popup.querySelector('.popup__button-close');
    //this._elementItem;
  }

  _openPopUp() {
    document.addEventListener('keydown', Card._handleCloseByEsc);
    const picturePopup = this._popup;
    const picturePopUpButtonClose = this._popUpButtonClose;
    picturePopUpButtonClose.addEventListener('click', this._closePopUp);
    picturePopup.classList.add('popup_opened');
  }
  
  _closePopUp() {
    const picturePopUp = document.querySelector('#popUpPicture');
    const picturePopUpButtonClose = picturePopUp.querySelector('.popup__button-close');
    picturePopUp.classList.remove('popup_opened');
    document.removeEventListener('keydown', Card._handleCloseByEsc);
    picturePopUpButtonClose.removeEventListener('click', this._closePopUp);
  }

  static _handleCloseByEsc(evt) {
    if (evt.key === 'Escape') {  
      const buttonClose = document.querySelector('#popUpPicture').querySelector('.popup__button-close');
      (new Card({name: '', link: ''}, ''))._closePopUp();  //  или можнообъявить _closePopUp статичным и переписать
                                                           //  через Card._closePopUp в других учатсках кода
    }
  }
  
  static _handleCloseByClickOutside(evt) {
    if (evt.target.classList.contains('popup')) {
      (new Card({name: '', link: ''}, ''))._closePopUp();
    }
  }

  _clickButtonLike(evt) {
    evt.preventDefault();
    const buttonLike = evt.target;
    buttonLike.classList.toggle('elements__like-active');
  }
  
  _deleteCard(evt) {
    const deleteButton = evt.target;
    const elementItem = deleteButton.closest('.elements__item');
    elementItem.remove();
  }

  _openPicture(title, image) {
    const popUpPicture = this._popup;
    popUpPicture.querySelector('.popup__image-picture').src = image;
    popUpPicture.querySelector('.popup__image-title').textContent = title;
    popUpPicture.querySelector('.popup__image-picture').alt = 'Изображение: ' + title;
    this._openPopUp();
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
    this._elementItem.querySelector('.elements__picture').addEventListener('click', () => 
        this._openPicture(this._title, this._image));
    this._elementItem.querySelector('.elements__delete').addEventListener('click', this._deleteCard);
    this._elementItem.querySelector('.elements__like').addEventListener('click', this._clickButtonLike);
    this._popup.addEventListener('click', Card._handleCloseByClickOutside);
  }

/* generate(){} = createCard(){} */
  createCard() {
    this._elementItem = this._getTemplate();
    const picture = this._elementItem.querySelector('.elements__picture');
    picture.src = this._image;
    picture.alt = 'Изображение: ' + this._title;
    this._elementItem.querySelector('.elements__title').textContent = this._title;
    this._setEventListeners();
  
    return this._elementItem;
  }

}