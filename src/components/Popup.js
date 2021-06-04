export default class Popup {
    constructor(
        popupSelector
    ) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._ESCClose.bind(this)
    }


    setEventListeners() {
        this._popup.querySelector('.popup__btn-back').addEventListener('click', () => {
            this.close();
        });
        this._popup.querySelector('.popup__background').addEventListener('click', () => {
            this.close();
        });
    }

    _ESCClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        };
    }

    close() {
        this._popup.classList.remove('popup__open')
        document.removeEventListener('keyup', this._handleEscClose);

    }


    open() {
        this._popup.classList.add('popup__open')
        document.addEventListener('keyup', this._handleEscClose);
    }

}