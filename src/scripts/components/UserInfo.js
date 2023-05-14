export default class UserInfo {

    constructor({nameSelector, descriptionSelector, avatarSelector}) {
        this._profileTitle = document.querySelector(nameSelector);
        this._profileSubtitle = document.querySelector(descriptionSelector);
        this._profileAvatar = document.querySelector(avatarSelector);
        this._id = '';
    }

    getUserInfo() {
        return {profileTitle: this._profileTitle.textContent, profileSubtitle: this._profileSubtitle.textContent};
    }

    getUserId() {
        return this._id;
    }

    setUserId(newId) {
        this._id = newId;
    }

    setUserInfo({name, description, avatar}) {
        this._profileTitle.textContent = name;
        this._profileSubtitle.textContent = description;
        this._profileAvatar.src = avatar;
    }

}