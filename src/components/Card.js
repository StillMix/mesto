export default class Card {
    constructor(config, data, openImagePopup, deleteCardHandler, likeCardHandler, removeLikeCardHandler) {
        this._name = config.name;
        this._link = config.link;
        this._cardSelector = config.cardSelector;
        this._api = config.api;
        this._idUser = config.apiUser;
        this._likes = data.likes;
        this._id = data._id;
        this._data = data;
        this._owner = data.owner._id;
        this._deleteCardHandler = deleteCardHandler;
        this._openImagePopup = openImagePopup;
        this._liked = likeCardHandler;
        this._removelike = removeLikeCardHandler;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);



        return cardElement;
    }

    _like() {
        const heart = this._element.querySelector('.element__heart');
        const likes = this._element.querySelector('.element__likes');
        if (!this._element.querySelector('.element__heart_active')) {
            this._liked(this._api, this._likes, heart, likes, this._id)
        } else {
            this._removelike(this._api, this._likes, heart, likes, this._id)
        }

    }

    setEventListeners() {
        const basket = this._element.querySelector('.element__basket');
        this._element.querySelector('.element__heart').addEventListener('click', () => {
            this._like();
        });
        if (this._owner === this._idUser) {
            basket.addEventListener('click', () => {
                this._deleteCardHandler(this._element, this._api, this._id)
            });
        } else {
            basket.classList.add('element__basket-disactive');
        }
        if (this._likes.find(item => item._id === this._idUser)) {
            this._element.querySelector('.element__heart').classList.add('element__heart_active')
        } else {
            console.log('нет')
        }

        this._element.querySelector('.element__btn-open').addEventListener('click', () => {

            this._openImagePopup();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this.setEventListeners();
        this._element.querySelector('.element__likes').textContent = this._likes.length;
        const elementImage = this._element.querySelector('.element__image');
        const heart = this._element.querySelector('.element__heart');
        elementImage.src = this._link;
        this._element.querySelector('.element__name').textContent = this._name;
        elementImage.alt = this._name;
        return this._element;
    }
}