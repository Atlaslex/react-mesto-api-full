class Api {
  constructor(configApi) {
    this._configApi = configApi;
    this._serverUrl = this._configApi.serverUrl;
    this._headers = this._configApi.headers;
  }

  _checkAnswer(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._serverUrl}/cards`, {
      headers: this._headers
    })
      .then((res) => {
        return this._checkAnswer(res);
      })
  }

  addNewCard(data) {
    return fetch(`${this._serverUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((res) => {
        return this._checkAnswer(res);
      })
  }

  getUserInfo() {
    return fetch(`${this._serverUrl}/users/me`, {
      headers: this._headers
    })
      .then((res) => {
        return this._checkAnswer(res);
      })
  }

  patchUserInfo(userData) {
    return fetch(`${this._serverUrl}/users/me`, {

      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(userData)
    })
      .then((res) => {
        return this._checkAnswer(res);
      })
  }

  patchAvatarInfo(avatarData) {
    return fetch(`${this._serverUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarData
      })
    })
      .then((res) => {
        return this._checkAnswer(res);
      })
  }

  setLike(data) {
    return fetch(`${this._serverUrl}/cards/${data._id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then((res) => {
        return this._checkAnswer(res);
      })
  }

  toggleLike(cardId, isLiked) {
    return fetch(`${this._serverUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: isLiked ? 'DELETE' : 'PUT',
    })
      .then((res) => {
        this._checkAnswer(res);
        console.log(res);
      })
  }

  deleteLike(data) {
    return fetch(`${this._serverUrl}/cards/${data._id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => {
        return this._checkAnswer(res);
      })
  }

  deleteCard(data) {
    return fetch(`${this._serverUrl}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => {
        return this._checkAnswer(res);
      })
  }

}

const api = new Api({
  serverUrl: 'https://atlaslex.students.nomoredomains.icu/',
  headers: {
    // authorization: '5bbfedaa-4f8d-4bb6-adea-81a84541445e',
    'Content-Type': 'application/json',
  }
});

export default api;


// 'https://mesto.nomoreparties.co/v1/cohort-45'