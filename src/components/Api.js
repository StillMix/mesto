export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }
    _check(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject("Произошла ошибка");
        }
    }
    getCards() {
        return fetch(`${this._url}/cards/`, {
            headers: this._headers,
        }).then((res) => {
            return this._check(res)

        });
    }

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data),
        }).then((res) => {
            return this._check(res)
        });
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then((res) => {
            return this._check(res)
        });
    }
    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data),
        }).then((res) => {
            return this._check(res)
        });
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
                headers: this._headers
            })
            .then((res) => {
                return this._check(res)
            })
    }
    setUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data),
        }).then((res) => {
            return this._check(res)
        });
    }

    setLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers,
        }).then((res) => {
            return this._check(res)
        });

    }
    removeLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then((res) => {
            return this._check(res)
        });

    }
}