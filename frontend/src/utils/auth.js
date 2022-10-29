const BASE_URL = 'https://api.atlaslex.students.nomoredomains.icu';

const checkAnswer = (res) => {
  if(res.ok) {
    return res.json();
  }
  
  return res.json().then((err) => {
    err.statusCode = res.status;
    return Promise.reject(err);
  })
}

export const register = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
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
  const res = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  });
  const data = await checkAnswer(res);
  return data;
}

export const getUserData = async (token) => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    }
  })

  const data = await checkAnswer(res);
  return data;
}

export const signOut = async () => {
  const res = await fetch(`${BASE_URL}/signout`, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  const data = await checkAnswer(res);
  return data;
} 
