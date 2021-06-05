import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { imageContainer, validateDelete, btnEditUser, btnEditAvatar, btnAddCard, popupImage, btnDelCard, popupAvatarBtn, popupBtnUser, popupDelete, popupNewCard, popupAvatar, popupEdit, imageTemplate, avatarError, nameError, aboutError, nameCardError, srcCardError, validateEditAvatar, popupAvatarOverlay, avatarInput, popupAvatarEdit, profileAvatar, btnCloseImage, formElementNewCard, btnOpenNewCard, btnCloseNewCard, formElementEdit, btnOpenEdit, btnCloseEdit, popupImageOverlay, popupNewCardOverlay, popupEditOverlay, validateEdit, validateNewCard, popupImageName, popupImageSrc, nameInputNewCard, srcInput, nameInputEdit, jobInput, profileName, profileJob } from '../utils/constants.js';
import { renderLoading } from '../utils/utils.js';
const popupImageOpen = new PopupWithImage('.popup-image');
const userInfoEdit = new UserInfo(profileName, profileJob, profileAvatar);
const popupDel = new PopupWithSubmit('.popup_type_delete');
let userId;


//api
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-23',
    headers: {
        authorization: 'b0c69cc4-99b5-4dbc-a834-60af5b3717c3',
        'Content-Type': 'application/json'
    }
})


//вспомогательные функции

const cardList = new Section((data) => { cardList.appendItem(createCard(data.name, data.link, api, userId, data, data)) }, imageContainer)



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
                }).catch((err) => console.log(err)).finally(() => { renderLoading('.popup-btn-delete-card', 'Да') });
                renderLoading('.popup-btn-delete-card', 'Удаление...')

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
    api.setUserInfo({ name: values.NameInput, about: values.JobInput }).then(() => {
        userInfoEdit.setUserInfo(values.NameInput, values.JobInput);
        popupEditProfile.close()
    }).catch((err) => {
        console.log(err)
    }).finally(() => { renderLoading('.popup-btn-edit', 'Сохранить') });
    renderLoading('.popup-btn-edit', 'Сохранение...');
});

function openEditProfilePopup() {
    validateEdit.disableSubmitButton()
    const userData = userInfoEdit.getUserInfo();
    nameInputEdit.value = userData.name;
    jobInput.value = userData.job;
    validateEdit.resetValidation();
    popupEditProfile.open();
}
//
const popupEditAvatar = new PopupWithForm('.popup_type_editAvatar', (values) => {
    api.setUserAvatar({ avatar: values.avatarInput }).then((data) => {
        userInfoEdit.setUserAvatar(data.avatar);
        popupEditAvatar.close();
    }).catch((err) => {
        console.log(err)
    }).finally(() => { renderLoading('.popup-btn-create-avatar', 'Сохранить') });
    renderLoading('.popup-btn-create-avatar', 'Сохранение...');
})

function openFormAvatar() {
    popupEditAvatar.open();
    validateEditAvatar.disableSubmitButton();
    validateEditAvatar.resetValidation();
}
//






//



//СОДЕРЖИМОЕ ПРОФИЛЯ
api.getUserInfo().then((user) => {
        api.getCards().then((data) => {
            userId = user._id
            userInfoEdit.setUserAvatar(user.avatar);
            userInfoEdit.setUserInfo(user.name, user.about);
            cardList.renderItems(data)
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
            popupAddCard.close()

        })
        .catch((err) => {
            console.log(err)
        }).finally(() => { renderLoading('.popup-btn-create-new-card', 'Создать') });
    renderLoading('.popup-btn-create-new-card', 'Создание...');

});


//
popupAvatarEdit.addEventListener('click', openFormAvatar);
btnOpenNewCard.addEventListener('click', () => {
    popupAddCard.open();
    validateNewCard.disableSubmitButton();
    validateNewCard.resetValidation();
});
btnOpenEdit.addEventListener('click', openEditProfilePopup);

validateEditAvatar.enableValidation();
validateNewCard.enableValidation();
validateEdit.enableValidation();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupEditAvatar.setEventListeners();
popupDel.setEventListeners();
popupImageOpen.setEventListeners()