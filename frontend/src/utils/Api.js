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

// class Api {
//   constructor(configApi) {
//     this._configApi = configApi;
//     this._serverUrl = this._configApi.serverUrl;
//     this._headers = this._configApi.headers;
//   }

//   _checkAnswer(res) {
//     if (res.ok) {
//       return res.json();
//     } else {
//       return Promise.reject(`Ошибка? ${res.status}`);
//     }
//   }

//   getInitialCards() {
//     return fetch(`${this._serverUrl}/cards`, {
//       headers: this._headers
//     })
//       .then((res) => {
//         return this._checkAnswer(res);
//       })
//   }

//   addNewCard(data) {
//     return fetch(`${this._serverUrl}/cards`, {
//       method: 'POST',
//       headers: this._headers,
//       body: JSON.stringify({
//         name: data.name,
//         link: data.link
//       })
//     })
//       .then((res) => {
//         return this._checkAnswer(res);
//       })
//   }

//   getUserInfo() {
//     return fetch(`${this._serverUrl}/users/me`, {
//       headers: this._headers
//     })
//       .then((res) => {
//         return this._checkAnswer(res);
//       })
//   }

//   patchUserInfo(userData) {
//     return fetch(`${this._serverUrl}/users/me`, {

//       method: 'PATCH',
//       headers: this._headers,
//       body: JSON.stringify(userData)
//     })
//       .then((res) => {
//         return this._checkAnswer(res);
//       })
//   }

//   patchAvatarInfo(avatarData) {
//     return fetch(`${this._serverUrl}/users/me/avatar`, {
//       method: 'PATCH',
//       headers: this._headers,
//       body: JSON.stringify({
//         avatar: avatarData
//       })
//     })
//       .then((res) => {
//         return this._checkAnswer(res);
//       })
//   }

//   setLike(data) {
//     return fetch(`${this._serverUrl}/cards/${data._id}/likes`, {
//       method: 'PUT',
//       headers: this._headers
//     })
//       .then((res) => {
//         return this._checkAnswer(res);
//       })
//   }

//   toggleLike(cardId, isLiked) {
//     return fetch(`${this._serverUrl}/cards/${cardId}/likes`, {
//       headers: this._headers,
//       method: isLiked ? 'DELETE' : 'PUT',
//     })
//       .then((res) => {
//         this._checkAnswer(res);
//         console.log(res);
//       })
//   }

//   deleteLike(data) {
//     return fetch(`${this._serverUrl}/cards/${data._id}/likes`, {
//       method: 'DELETE',
//       headers: this._headers
//     })
//       .then((res) => {
//         return this._checkAnswer(res);
//       })
//   }

//   deleteCard(data) {
//     return fetch(`${this._serverUrl}/cards/${data._id}`, {
//       method: 'DELETE',
//       headers: this._headers
//     })
//       .then((res) => {
//         return this._checkAnswer(res);
//       })
//   }

// }

// const api = new Api({
//   serverUrl: 'http://localhost:3000', 
//   // 'https://api.atlaslex.students.nomoredomains.icu'
//   headers: {
//     // authorization: '5bbfedaa-4f8d-4bb6-adea-81a84541445e',
//     'Content-Type': 'application/json',
//   }
// });

// export default api;


// // 'https://mesto.nomoreparties.co/v1/cohort-45'