const popup = document.querySelector('.popup');
const btnOpen = document.querySelector('.profile__change');
const btnClose = document.querySelector('.popup__back');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.input_type_name');
const jobInput = document.querySelector('.input_type_status');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__status');
const imageTemplate = document.querySelector('.element-template').content
const imageContainer = document.querySelector('.elements');
const imageOpen = document.querySelector('.imageFull');
const imageNamePopup = document.querySelector('.imageFull__title');
const imageSrcPopup = document.querySelector('.imageFull__image');
const imagesCreateOpen = document.querySelector('.profile__btn-add');
const popupImage = document.querySelector('.popupImage');
const imagesCloseBtn = document.querySelector('.popupImage__back');
const imagesCreateBtn = document.querySelector('.popupImage__form');
const imageCloseBtn = document.querySelector('.imageFull__back');
const inputName = document.querySelector('.input_type_nameIMG');
const inputLink = document.querySelector('.input_type_src');
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

function openPopup(object) {
    object.classList.add('popupopen__open');
}

function closePopup(object) {
    object.classList.remove('popupopen__open');
}

function openForm() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popup);

}


function formSubmitHandler(evt) {
    evt.preventDefault();
    profileJob.textContent = jobInput.value;
    profileName.textContent = nameInput.value;
    closePopup(popup)
}

function renderCard(data, wrap) {
    wrap.prepend(data);
}

function createCard(name, link, wrap) {
    const imageTemplateClone = imageTemplate.cloneNode(true);
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
        openPopup(imageOpen);
        imageNamePopup.textContent = imageName.textContent;
        imageSrcPopup.src = imageImage.src;
        imageSrcPopup.alt = name;
    });


    return imageTemplateClone;

};


initialCards.forEach(function(element) {
    const name = element.name;
    const link = element.link;
    const newCard = createCard(name, link)
    renderCard(newCard, imageContainer);
});


function handleAdd(evt) {
    evt.preventDefault();
    const newCard = createCard(inputName.value, inputLink.value);
    renderCard(newCard, imageContainer);
    inputName.value = '';
    inputLink.value = '';
    closePopup(popupImage);
}


imagesCreateOpen.addEventListener('click', () => openPopup(popupImage));
imagesCloseBtn.addEventListener('click', () => closePopup(popupImage));
imagesCreateBtn.addEventListener('submit', handleAdd);
imageCloseBtn.addEventListener('click', () => closePopup(imageOpen));
btnClose.addEventListener('click', () => closePopup(popup));
btnOpen.addEventListener('click', openForm);
formElement.addEventListener('submit', formSubmitHandler);