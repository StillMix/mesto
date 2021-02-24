const popup = document.querySelector('.popup');
const btnOpen = document.querySelector('.profile__change');
const btnClose = document.querySelector('.popup__back');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.input_type_name');
const jobInput = document.querySelector('.input_type_status');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__status');

function popupOpen() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function popupClose() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileJob.textContent = jobInput.value;
    profileName.textContent = nameInput.value;
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

const imageTemplate = document.querySelector('.element-template')
const imageContainer = document.querySelector('.elements');
const imageOpen = document.querySelector('.IMG');
const imageNamePopup = document.querySelector('.IMG__title');
const imageSrcPopup = document.querySelector('.IMG__image');
const imagesCreateOpen = document.querySelector('.profile__btn-add');
const popupImage = document.querySelector('.popupIMG');
const imagesCloseBtn = document.querySelector('.popupIMG__back');
const ImagesCreateBtn = document.querySelector('.popupIMG__form');
const ImageCloseBtn = document.querySelector('.IMG__back');

function close() {
    imageOpen.classList.remove('popupopen__open');
};

ImageCloseBtn.addEventListener('click', close);


function popupImageOpen() {
    popupImage.classList.add('popup__open');
}

function popupImageClose() {
    popupImage.classList.remove('popup__open');
}

imagesCreateOpen.addEventListener('click', popupImageOpen);
imagesCloseBtn.addEventListener('click', popupImageClose);

function createCard(name, link, wrap) {
    const imageTemplateClone = document.querySelector('.element-template').content.cloneNode(true);
    const imageName = imageTemplateClone.querySelector('.element__name');
    const imageImage = imageTemplateClone.querySelector('.element__image');

    imageName.textContent = name;
    imageImage.src = link;
    imageImage.alt = name;

    imageTemplateClone.querySelector('.element__heart').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_active');
    });

    imageTemplateClone.querySelector('.element__backet').addEventListener('click', function(evt) {
        evt.target.closest('.element').remove();
    });

    imageTemplateClone.querySelector('.elemnt__btnopen').addEventListener('click', function(evt) {
        imageOpen.classList.toggle('popupopen__open');
        imageNamePopup.textContent = imageName.textContent;
        imageSrcPopup.src = imageImage.src;
    });


    wrap.prepend(imageTemplateClone);
    return imageTemplateClone;

};

initialCards.forEach(function(element) {
    const name = element.name;
    const link = element.link;
    createCard(name, link, imageContainer)
});


function handleAdd(evt) {
    evt.preventDefault();
    const inputName = document.querySelector('.input_type_nameIMG');
    const inputLink = document.querySelector('.input_type_src');
    createCard(inputName.value, inputLink.value, imageContainer);
}

ImagesCreateBtn.addEventListener('submit', handleAdd);