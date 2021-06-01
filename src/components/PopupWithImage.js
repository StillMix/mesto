import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)

    }

    open({ name, link }) {
        super.open()
        const imageName = this._popup.querySelector('.popup-image__title');
        const imageSrc = this._popup.querySelector('.popup-image__image');
        imageName.textContent = name;
        imageSrc.src = link;
        imageName.alt = name;
        super.setEventListeners()
    }
}