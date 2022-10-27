const serverUrl = 'https://api.atlaslex.students.nomoredomains.icu';

const checkAnswer = (res) => {
  if(res.ok) {
    return res.json();
  }else {
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

export const getUserData = async (token) => {
  const res = await fetch(`${serverUrl}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })

  const data = await checkAnswer(res);
  return data;
}

export const register = async (email, password) => {
  const res = await fetch(`${serverUrl}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  });
  const data = await checkAnswer(res);

  return data;
}

export const authorize = async (email, password) => {
  const res = await fetch(`${serverUrl}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  });
  const data = await checkAnswer(res);
  return data;
}

