import Popup from './Popup.js';

export default class PopupForm extends Popup {
    constructor(
        popupSelector,
        submitCallback
    ) {
        super(popupSelector)
        this._submitCallback = submitCallback
    }
    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.input');

        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues;
    }


    setEventListeners() {
        this._popup.querySelector('.form')
            .addEventListener(
                'submit',
                evt => {
                    evt.preventDefault()
                    this._submitCallback(this._getInputValues())
                }
            )

        super.setEventListeners()
    }
}