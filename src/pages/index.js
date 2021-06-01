import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { imageContainer, popupImage, popupAvatarBtn, popupBtnUser, popupDelete, popupNewCard, popupAvatar, popupEdit, imageTemplate, avatarError, nameError, aboutError, nameCardError, srcCardError, validateEditAvatar, popupAvatarOverlay, avatarInput, popupAvatarEdit, profileAvatar, btnCloseImage, formElementNewCard, btnOpenNewCard, btnCloseNewCard, formElementEdit, btnOpenEdit, btnCloseEdit, popupImageOverlay, popupNewCardOverlay, popupEditOverlay, validateEdit, validateNewCard, popupImageName, popupImageSrc, nameInputNewCard, srcInput, nameInputEdit, jobInput, profileName, profileJob } from '../utils/constants.js';

const popupImageOpen = new PopupWithImage(popupImage);
const userInfoEdit = new UserInfo(profileName, profileJob, profileAvatar);
const popupDel = new PopupWithSubmit(popupDelete);



//вспомогательные функции

function closePopup(btn, element, messege) {
    document.querySelector(btn).textContent = messege;
    element.close()
}

function createCard(name, link, api, user, elem, image) {
    const card = new Card({
        name: name,
        link: link,
        cardSelector: '.element-template',
        api: api,
        apiUser: user,
    }, elem, () => { popupImageOpen.open(image) }, (element, apiEl, idEl) => {
        popupDel.setSubmitAction(() => {
            apiEl.deleteCard(idEl).then(() => {
                element.remove()
            }).catch((err) => console.log(err));
            document.querySelector('.popup-btn-delete-card').textContent = 'Удаление...'
            setTimeout(closePopup, 3000, '.popup-btn-delete-card', popupDel, 'да')
        })
        popupDel.open()
    }, (api, like, heart, likes, id) => {
        heart.classList.add('element__heart_active')
        likes.textContent = like.length + 1
        api.setLike(id).catch((err) => {
            console.log(err)
        })
    }, (api, like, heart, likes, id) => {
        heart.classList.remove('element__heart_active');
        likes.textContent = like.length - 1;
        api.removeLike(id).catch((err) => {
            console.log(err)
        })

    });
    return card.generateCard();

}




//api
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-23',
    headers: {
        authorization: 'b0c69cc4-99b5-4dbc-a834-60af5b3717c3',
        'Content-Type': 'application/json'
    }
})

// РЕДАКТИРОВНИЕ ПРОФИЛЯ

const popupEditProfile = new PopupWithForm(popupEdit, () => {
    userInfoEdit.setUserInfo(nameInputEdit.value, jobInput.value);
    api.setUserInfo({ name: nameInputEdit.value, about: jobInput.value })
    document.querySelector('.popup-btn-edit').textContent = 'Сохранение...'
    setTimeout(closePopup, 3000, '.popup-btn-edit', popupEditProfile, 'Сохранить')
});

function openEditProfilePopup() {
    userInfoEdit.getUserInfo(nameInputEdit, jobInput)
    nameError.textContent = '';
    aboutError.textContent = '';
    popupEditProfile.open();
}
//
const popupEditAvatar = new PopupWithForm(popupAvatar, () => {
    userInfoEdit.setUserAvatar(avatarInput.value);
    api.setUserAvatar({ avatar: avatarInput.value })
    document.querySelector('.popup-btn-create-avatar').textContent = 'Сохранение...'
    setTimeout(closePopup, 3000, '.popup-btn-create-avatar', popupEditAvatar, 'Сохранить')
})

function openFormAvatar() {
    avatarInput.value = '';
    avatarError.textContent = '';
    popupEditAvatar.open();
    validateEditAvatar.disableSubmitButton();
}
//


api.getUserInfo().then((data) => {
    userInfoEdit.setUserAvatar(data.avatar);
    userInfoEdit.setUserInfo(data.name, data.about);
}).catch((err) => console.log(err));


//



//СОДЕРЖИМОЕ ПРОФИЛЯ
api.getUserInfo().then((user) => {
        api.getCards().then((data) => {
            const cardList = new Section({
                    items: data,
                    renderer: (data) => {
                        if (data.owner._id === user._id) {
                            cardList.prependItem(createCard(data.name, data.link, api, user._id, data, data));
                        } else {
                            cardList.appendItem(createCard(data.name, data.link, api, user._id, data, data));
                        }
                    }
                },
                imageContainer
            );
            cardList.renderItems()
        })
    })
    .catch((err) => {
        console.log(err)
    });


const popupAddCard = new PopupWithForm(popupNewCard, (values) => {

    api.addCard({ name: values.NameIMGInput, link: values.SrcInput }).then((data) => {
        api.getUserInfo().then((user) => {
            const cardList = new Section({
                    items: { nameInputNewCard, srcInput },
                    renderer: () => {
                        cardList.prependItem(createCard(nameInputNewCard.value, srcInput.value, api, user._id, data, { name: values.NameIMGInput, link: values.SrcInput }));
                    }
                },
                imageContainer
            );
            cardList.addRenderCard();
            document.querySelector('.popup-btn-create-new-card').textContent = 'Создание...'
            validateNewCard.disableSubmitButton();
            setTimeout(closePopup, 3000, '.popup-btn-create-new-card', popupAddCard, 'Создать')

        })
    }).catch((err) => {
        console.log(err)
    });


});


//
popupAvatarEdit.addEventListener('click', openFormAvatar);
btnOpenNewCard.addEventListener('click', () => {
    popupAddCard.open();
    nameInputNewCard.value = '';
    srcInput.value = '';
    nameCardError.textContent = '';
    srcCardError.textContent = '';
    validateNewCard.disableSubmitButton();
});
btnOpenEdit.addEventListener('click', openEditProfilePopup);


validateEditAvatar.enableValidation();
validateEdit.enableValidation();
validateNewCard.enableValidation();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupEditAvatar.setEventListeners();
popupDel.setEventListeners()