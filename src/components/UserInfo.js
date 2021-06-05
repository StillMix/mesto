export default class UserInfo {
    constructor(
        name,
        about,
        avatar
    ) {
        this._name = name
        this._about = about
        this._avatar = avatar
    }

    setUserAvatar(newAvatar) {
        if (newAvatar) {
            this._avatar.src = newAvatar;
        }
    }
    getUserInfo() {
        const userdata = { name: '', job: '' };
        userdata.name = this._name.textContent
        userdata.job = this._about.textContent
        return userdata;

    }

    setUserInfo(newName, newJob) {
        if (newName) { this._name.textContent = newName }
        if (newJob) { this._about.textContent = newJob }


    }

}