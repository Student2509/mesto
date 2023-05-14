export default class Api {

    constructor(tokenNumber, cohortNumber, apiURL) {
        this._tokenNumber = tokenNumber;
        this._cohortNumber = cohortNumber;
        this._apiURL = apiURL;
        this._fullApiUrl = `${this._apiURL}${this._cohortNumber}/`;
        this._headers = {
            authorization: this._tokenNumber,
            'Content-Type': 'application/json'
        }
    }

    _handleApi(res) {
        return res.ok ? 
            res.json() : 
            Promise.reject(`Ошибка в получении данных. Код: ${res.status}, описание: ${res.statusText}`);
    }

    getUserInfo() {
        return fetch(`${this._fullApiUrl}users/me`, {
            headers: this._headers
        })
            .then(res => this._handleApi(res))
            // .then(res => res.json())
            // .then((result) => {
            // console.log(result);
            // });
    }

    getInitialCards() {
        return fetch(`${this._fullApiUrl}cards`, {
            headers: this._headers
        })
            .then(res => this._handleApi(res))
    }

    // editProfileInfo({newName, newDescription}) {
    //     return fetch(`${this._fullApiUrl}users/me`, {
    //         method: 'PATCH', 
    //         headers: this._headers, 
    //         body: JSON.stringify({name: newName, about: newDescription})
    //     })
    //         .then(res => this._handleApi(res))
    // }

    editProfileInfo(data) {
        return fetch(`${this._fullApiUrl}users/me`, {
            method: 'PATCH', 
            headers: this._headers, 
            body: JSON.stringify(data)
        })
            .then(res => this._handleApi(res))
    }

    addCard({newName, newLink}) {
        return fetch(`${this._fullApiUrl}/cards`, {
            method: 'POST', 
            headers: this._headers, 
            body: JSON.stringify({name: newName, link: newLink})
        })
            .then(res => this._handleApi(res))
    }

    likeCard(cardId, isLiked) {
        // console.log('entering likeCard of Api')
        return fetch(`${this._fullApiUrl}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT', 
            headers: this._headers
        })
            .then(res => this._handleApi(res))
    }

    deleteCard(cardId) {
        console.log('entering deleteCard of Api');
        return fetch(`${this._fullApiUrl}/cards/${cardId}`, {
            method: 'DELETE', 
            headers: this._headers,
        })
            .then(res => this._handleApi(res))
    }

    setUserAvatar(avatar) {
        return fetch(`${this._fullApiUrl}/users/me/avatar`, {
            method: 'PATCH', 
            headers: this._headers, 
            body: JSON.stringify(avatar)
        })
            .then(res => this._handleApi(res))
        
    }

}