let popup = document.querySelector('.popup');
let btn_open = document.querySelector('.profile__change');
let btn_close = document.querySelector('.popup__back');
let formElement = document.querySelector('.popup__btn');
let nameInput = document.querySelector('.input_type_name');
let jobInput = document.querySelector('.input_type_status');
    let profilename = document.querySelector('#profile__name');
    let profilejob = document.querySelector('#profile__status');

btn_open.addEventListener('click', function () {
    console.log('Мы кликнули по элементу');
    popup.className = 'popup__opened';
  }); 

  btn_close.addEventListener('click', function () {
    console.log('Мы кликнули по элементу');
    popup.className = 'popup';
  }); 


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    // Получите значение полей jobInput и nameInput из свойства value
    nameInput.value = '';
    jobInput.value = '';
    // Выберите элементы, куда должны быть вставлены значения полей
    profilejob.textContent = jobInput.value;
    profilename.textContent = nameInput.value;
    // Вставьте новые значения с помощью textContent
    
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 

