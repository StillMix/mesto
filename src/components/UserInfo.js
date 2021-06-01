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
    getUserInfo(name, job) {
        const userdata = { name, job };
        userdata.name.value = this._name.textContent
        userdata.job.value = this._about.textContent
        return userdata;

    }

    setUserInfo(newName, newJob) {
        if (newName) { this._name.textContent = newName }
        if (newJob) { this._about.textContent = newJob }


    }

}