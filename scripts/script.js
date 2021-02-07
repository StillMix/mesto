let popup = document.querySelector('.popup');
let btnOpen = document.querySelector('.profile__change');
let btnClose = document.querySelector('.popup__back');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.input_type_name');
let jobInput = document.querySelector('.input_type_status');
let profilename = document.querySelector('.profile__name');
let profilejob = document.querySelector('.profile__status');


function OpenPopup (){
  popup.classList.add('popup_opened');
  nameInput.value = profilename.innerHTML;
  jobInput.value = profilejob.innerHTML;
}
btnOpen.addEventListener('click', OpenPopup); 

function ClosePopup(){
   popup.classList.remove('popup_opened');
}
btnClose .addEventListener('click', ClosePopup); 


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault();
    popup.classList.remove('popup_opened');
    profilejob.textContent = jobInput.value;
    profilename.textContent = nameInput.value; 
}

formElement.addEventListener('submit', formSubmitHandler); 

