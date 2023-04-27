export default class UserInfo {

    constructor({nameSelector, descriptionSelector}) {
        this._profileTitle = document.querySelector(nameSelector);
        this._profileSubtitle = document.querySelector(descriptionSelector);
    }

    getUserInfo() {
        return {profileTitle: this._profileTitle.textContent, profileSubtitle: this._profileSubtitle.textContent};
    }

    setUserInfo({name, description}) {
        this._profileTitle.textContent = name;
        this._profileSubtitle.textContent = description;
    }

}