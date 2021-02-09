let popup = document.querySelector('.popup');
let btnOpen = document.querySelector('.profile__change');
let btnClose = document.querySelector('.popup__back');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.input_type_name');
let jobInput = document.querySelector('.input_type_status');
let profilename = document.querySelector('.profile__name');
let profilejob = document.querySelector('.profile__status');


function popupOpen() {
    popup.classList.add('popup_opened');
    nameInput.value = profilename.textContent;
    jobInput.value = profilejob.textContent;
}

function popupClose() {
    popup.classList.remove('popup_opened');
}


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault();
    popupClose();
    profilejob.textContent = jobInput.value;
    profilename.textContent = nameInput.value;
}

btnClose.addEventListener('click', popupClose);
btnOpen.addEventListener('click', popupOpen);
formElement.addEventListener('submit', formSubmitHandler);