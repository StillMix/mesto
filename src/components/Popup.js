import { ESCClose } from '../utils/constants.js'

export default class Popup {
    constructor(
        popupSelector
    ) {
        this._popup = popupSelector;
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
        if (evt.key === ESCClose) {
            this._popup.classList.remove('popup__open')
        };
    }

    close() {
        this._popup.classList.remove('popup__open')
        document.removeEventListener('keyup', (evt) => this._ESCClose(evt));

    }


    open() {
        this._popup.classList.add('popup__open')
        document.addEventListener('keyup', (evt) => this._ESCClose(evt));
    }

}