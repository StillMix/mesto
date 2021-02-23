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

function formSubmitHandler(evt) {

    evt.preventDefault();

    profilejob.textContent = jobInput.value;

    profilename.textContent = nameInput.value;

    popupClose();

}

btnClose.addEventListener('click', popupClose);
btnOpen.addEventListener('click', popupOpen);
formElement.addEventListener('submit', formSubmitHandler);


const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const IMGOpen = document.querySelector('.popupopen__container');
const IMGNamePopup = document.querySelector('.popupopen__title');
const IMGSrcPopup = document.querySelector('.popupopen__img');

initialCards.forEach(function(element) {
    const IMGtemplate = document.querySelector('.element-template').content.cloneNode(true);
    const IMGName = IMGtemplate.querySelector('.element__name');
    const IMGImage = IMGtemplate.querySelector('.element__image');

    IMGName.textContent = element.name;
    IMGImage.src = element.link;

    IMGtemplate.querySelector('.element__heart').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_active');
    });
    IMGtemplate.querySelector('.element__backet').addEventListener('click', function(evt) {
        evt.target.closest('.element').remove();
    });
    IMGtemplate.querySelector('.elemnt__btnopen').addEventListener('click', function(evt) {
        IMGOpen.classList.toggle('popupopen__open');
        IMGNamePopup.textContent = IMGName.textContent;
        IMGSrcPopup.src = IMGImage.src;
    });

    document.querySelector('.elements').append(IMGtemplate);


});

const IMGBtnClose = document.querySelector('.popupopen__back');

function close() {
    IMGOpen.classList.remove('popupopen__open');
};

IMGBtnClose.addEventListener('click', close);

const btnClosePopupIMG = document.querySelector('.popupIMG__back');
const btnAdd = document.querySelector('.profile__btn-add');
const popupIMG = document.querySelector('.popupIMG');

function popupIMGOpen() {
    popupIMG.classList.add('popup__open');
}

function popupIMGClose() {
    popupIMG.classList.remove('popup__open');
}

btnClosePopupIMG.addEventListener('click', popupIMGClose);
btnAdd.addEventListener('click', popupIMGOpen);

const IMGtemplate = document.querySelector('.element-template').content;
const IMGContainer = document.querySelector('.elements');
const addbtnform = document.querySelector('.popupIMG__form');
const inputName = document.querySelector('.input_type_nameIMG');
const inputSrc = document.querySelector('.input_type_src');


function addIMG(evt) {
    evt.preventDefault();
    const IMGadd = IMGtemplate.querySelector('.element').cloneNode(true);
    const IMGName = IMGadd.querySelector('.element__name');
    const IMGImage = IMGadd.querySelector('.element__image');

    IMGName.textContent = inputName.value;
    IMGImage.src = inputSrc.value;

    IMGContainer.prepend(IMGadd);
    IMGadd.querySelector('.element__heart').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_active');
    });
    IMGadd.querySelector('.element__backet').addEventListener('click', function(evt) {
        const target = evt.target;
        const targetItem = target.closest('.element');
        targetItem.remove();
    });
    IMGadd.querySelector('.elemnt__btnopen').addEventListener('click', function(evt) {
        IMGOpen.classList.toggle('popupopen__open');
        IMGNamePopup.textContent = IMGName.textContent;
        IMGSrcPopup.src = IMGImage.src;
    });
};

addbtnform.addEventListener('submit', addIMG);