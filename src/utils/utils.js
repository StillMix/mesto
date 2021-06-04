export function renderLoading(btnSelector, mess, valid) {
    document.querySelector(btnSelector).textContent = mess;
    valid.disableSubmitButton();
}