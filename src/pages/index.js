import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { imageContainer, validateDelete, popupImage, popupAvatarBtn, popupBtnUser, popupDelete, popupNewCard, popupAvatar, popupEdit, imageTemplate, avatarError, nameError, aboutError, nameCardError, srcCardError, validateEditAvatar, popupAvatarOverlay, avatarInput, popupAvatarEdit, profileAvatar, btnCloseImage, formElementNewCard, btnOpenNewCard, btnCloseNewCard, formElementEdit, btnOpenEdit, btnCloseEdit, popupImageOverlay, popupNewCardOverlay, popupEditOverlay, validateEdit, validateNewCard, popupImageName, popupImageSrc, nameInputNewCard, srcInput, nameInputEdit, jobInput, profileName, profileJob } from '../utils/constants.js';
import { renderLoading } from '../utils/utils.js';
const popupImageOpen = new PopupWithImage('.popup-image');
const userInfoEdit = new UserInfo(profileName, profileJob, profileAvatar);
const popupDel = new PopupWithSubmit('.popup_type_delete');
let userId;
const cardList = new Section(imageContainer);

//api
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-23',
    headers: {
        authorization: 'b0c69cc4-99b5-4dbc-a834-60af5b3717c3',
        'Content-Type': 'application/json'
    }
})
Promise.all([api.getUserInfo()])
    .then(([userData]) => {
        userId = userData._id
    })

//вспомогательные функции

function closePopup(btn, messege) {
    document.querySelector(btn).textContent = messege;
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
                    setTimeout(() => { popupDel.close() }, 100)
                }).catch((err) => console.log(err)).finally(() => { document.querySelector('.popup-btn-delete-card').textContent = 'Да'; });
                document.querySelector('.popup-btn-delete-card').textContent = 'Удаление...';

            })
            popupDel.open()
        }, (heart, like, id) => {
            api.setLike(id).then((data) => {
                heart.classList.add('element__heart_active')
                like.textContent = data.likes.length;
            }).catch((err) => {
                console.log(err)
            })
        },
        (heart, like, id) => {
            api.removeLike(id).then((data) => {
                heart.classList.remove('element__heart_active');
                like.textContent = data.likes.length;
            }).catch((err) => {
                console.log(err)
            })

        });
    return card.generateCard();

}


// РЕДАКТИРОВНИЕ ПРОФИЛЯ

const popupEditProfile = new PopupWithForm('.popup_type_edit', (values) => {
    userInfoEdit.setUserInfo(values.NameInput, values.JobInput);
    api.setUserInfo({ name: nameInputEdit.value, about: jobInput.value }).catch((err) => {
        console.log(err)
    });
    renderLoading('.popup-btn-edit', 'Сохранение...', validateEdit);
    setTimeout(closePopup, 3000, '.popup-btn-edit', 'Сохранить')
    setTimeout(() => { popupEditProfile.close() }, 3000)
});

function openEditProfilePopup() {
    validateEdit.disableSubmitButton()
    userInfoEdit.getUserInfo(nameInputEdit, jobInput)
    validateEdit.enableValidation();
    popupEditProfile.open();
}
//
const popupEditAvatar = new PopupWithForm('.popup_type_editAvatar', () => {
    userInfoEdit.setUserAvatar(avatarInput.value);
    api.setUserAvatar({ avatar: avatarInput.value }).catch((err) => {
        console.log(err)
    });
    renderLoading('.popup-btn-create-avatar', 'Сохранение...', validateEditAvatar);
    setTimeout(() => { popupEditAvatar.close() }, 3000)
    setTimeout(closePopup, 3000, '.popup-btn-create-avatar', 'Сохранить')
})

function openFormAvatar() {
    validateEditAvatar.enableValidation();
    popupEditAvatar.open();
    validateEditAvatar.disableSubmitButton();
}
//






//



//СОДЕРЖИМОЕ ПРОФИЛЯ
api.getUserInfo().then((user) => {
        api.getCards().then((data) => {
            userInfoEdit.setUserAvatar(user.avatar);
            userInfoEdit.setUserInfo(user.name, user.about);
            cardList.renderItems({
                items: data,
                renderer: (data) => {
                    cardList.appendItem(createCard(data.name, data.link, api, userId, data, data));
                }
            })
        }).catch((err) => {
            console.log(err)
        })
    })
    .catch((err) => {
        console.log(err)
    });


const popupAddCard = new PopupWithForm('.popup_type_new-card', (values) => {
    api.addCard({ name: values.NameIMGInput, link: values.SrcInput }).then((data) => {
            cardList.prependItem(createCard(data.name, data.link, api, userId, data, data));
            renderLoading('.popup-btn-create-new-card', 'Создание...', validateNewCard);
            setTimeout(() => { popupAddCard.close() }, 3000)
            setTimeout(closePopup, 3000, '.popup-btn-create-new-card', 'Создать')

        })
        .catch((err) => {
            console.log(err)
        });

});


//
popupAvatarEdit.addEventListener('click', openFormAvatar);
btnOpenNewCard.addEventListener('click', () => {
    popupAddCard.open();
    validateNewCard.enableValidation();
    validateNewCard.disableSubmitButton();
});
btnOpenEdit.addEventListener('click', openEditProfilePopup);




popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupEditAvatar.setEventListeners();
popupDel.setEventListeners();
popupImageOpen.setEventListeners()