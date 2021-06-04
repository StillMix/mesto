import FormValidator from '../components/FormValidator.js';
export const validationConfig = {
    formSelector: '.form',
    inputSelector: '.input',
    submitButtonSelector: '.popup__btn-create',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'input_type_error',
}

//popupEdit
export const popupEdit = document.querySelector('.popup_type_edit');
export const btnOpenEdit = document.querySelector('.profile__btn-edit');
export const btnCloseEdit = document.querySelector('.btn-back-popup-edit');
export const nameInputEdit = document.querySelector('.input_type_name');
export const jobInput = document.querySelector('.input_type_status');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__status');
export const formElementEdit = document.querySelector('.form_type_edit');
export const popupEditOverlay = document.querySelector('.background-popup-edit');
//popupNewCard
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const btnOpenNewCard = document.querySelector('.profile__btn-add');
export const btnCloseNewCard = document.querySelector('.btn-back-popup-new-card');
export const btnNewCard = document.querySelector('.popup-btn-create-new-card');
export const nameInputNewCard = document.querySelector('.input_type_nameImage');
export const srcInput = document.querySelector('.input_type_src');
export const formElementNewCard = document.querySelector('.form_type_new-card');
export const popupNewCardOverlay = document.querySelector('.background-popup-new-card');
// createCard
export const imageTemplate = document.querySelector('.element-template').content
export const imageContainer = document.querySelector('.elements');
//popupImage
export const popupImage = document.querySelector('.popup-image');
export const btnCloseImage = document.querySelector('.popup-image__btn-back');
export const popupImageName = document.querySelector('.popup-image__title');
export const popupImageSrc = document.querySelector('.popup-image__image');
export const popupImageOverlay = document.querySelector('.popup-image__background');
export const validateNewCard = new FormValidator(validationConfig, '.popup_type_new-card');
export const validateEditAvatar = new FormValidator(validationConfig, '.popup_type_editAvatar');
export const validateEdit = new FormValidator(validationConfig, '.popup_type_edit');
export const validateDelete = new FormValidator(validationConfig, '.popup_type_delete');
//popupOpen

export const popupBtnUser = document.querySelector('.popup__btn-create');
export const ESCClose = 'Escape';
export const profileAvatar = document.querySelector('.profile__avatar');
export const avatarInput = document.querySelector('.input_type_Avatar');
export const popupAvatarEdit = document.querySelector('.profile__avatar-edit');
export const popupAvatarOverlay = document.querySelector('.background-popup-editAvatar');
export const popupAvatarBtn = document.querySelector('.btn-back-popup-editAvatar');
export const popupAvatar = document.querySelector('.popup_type_editAvatar');
//errorPopup
export const nameError = document.querySelector('.profile-name-input-error');
export const aboutError = document.querySelector('.profile-status-input-error');
export const nameCardError = document.querySelector('.card-name-input-error');
export const srcCardError = document.querySelector('.card-src-input-error');
export const avatarError = document.querySelector('.profile-avatar-input-error');
//popupDelete 
export const popupDelete = document.querySelector('.popup_type_delete');
export const btnDelCard = document.querySelector('.popup-btn-delete-card');
export const btnEditUser = document.querySelector('.popup-btn-edit');
export const btnEditAvatar = document.querySelector('.popup-btn-create-avatar');