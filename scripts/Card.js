export class Card {

  constructor(card, templateSelector, openPicture) {
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._openPicture = openPicture;
    // ----- генерируются за пределами конструктора: -----
    //  this._elementItem;
    //  this._elementItemPicture
  }

  _clickButtonLike(evt) {
    evt.preventDefault();
    const buttonLike = evt.target;
    buttonLike.classList.toggle('elements__like-active');
  }

  _deleteCard(element) {
    element.remove();
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
        this._openPicture(this._name, this._link);
    });
    this._elementItem.querySelector('.elements__delete').addEventListener('click', () => {
        this._deleteCard(this._elementItem);
    });
    this._elementItem.querySelector('.elements__like').addEventListener('click', this._clickButtonLike);
  }

  generate() {
    this._elementItem = this._getTemplate();
    this._elementItemPicture = this._elementItem.querySelector('.elements__picture');
    this._elementItemPicture.src = this._link;
    this._elementItemPicture.alt = 'Изображение: ' + this._name;
    this._elementItem.querySelector('.elements__title').textContent = this._name;
    this._setEventListeners();
  
    return this._elementItem;
  }

}