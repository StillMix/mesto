import Popup from './Popup.js'

export default class popupWithSubmit extends Popup {
    constructor(
        popupSelector,
        submitCallback
    ) {
        super(popupSelector)
    }
    setSubmitAction(action) {
        this._submitCallback = action
    }
    setEventListeners() {
        this._popup.querySelector('.form')
            .addEventListener(
                'submit',
                evt => {
                    evt.preventDefault()
                    this._submitCallback()
                }
            )

        super.setEventListeners()
    }
}