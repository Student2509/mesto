export default class UserInfo {

    constructor({nameSelector, descriptionSelector, avatarSelector}) {
        this._profileTitle = document.querySelector(nameSelector);
        this._profileSubtitle = document.querySelector(descriptionSelector);
        this._profileAvatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {profileTitle: this._profileTitle.textContent, profileSubtitle: this._profileSubtitle.textContent};
    }

    setUserInfo({name, description, avatar}) {
        this._profileTitle.textContent = name;
        this._profileSubtitle.textContent = description;
        this._profileAvatar.src = avatar;
    }

}