class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._headers = this._options.headers;
  }

  _checkAnswer(res) {
    if(res.ok) {
      return res.json();
    }
    return res.json().then((err) => {
      err.statusCode = res.status;
      return Promise.reject(err);
    })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: this._headers
    })
    .then((res) => {
      return this._checkAnswer(res);
    })
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers
    })
    .then((res) => {
      return this._checkAnswer(res);
    })
  }

  patchUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then((res) => {
      return this._checkAnswer(res);
    })
  }

  patchAvatarInfo(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
    .then((res) => {
      return this._checkAnswer(res);
    })
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
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

  deleteCard(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
      .then((res) => {
        return this._checkAnswer(res);
      })
  }

  setLike(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers
    })
      .then((res) => {
        return this._checkAnswer(res);
      })
  }

  deleteLike(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
      .then((res) => {
        return this._checkAnswer(res);
      })
  }
}

const api = new Api({
  baseUrl: 
  // 'http://localhost:3005',
  'https://api.atlaslex.students.nomoredomains.icu',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;

