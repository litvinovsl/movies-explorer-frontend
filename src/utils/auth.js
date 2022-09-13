const BASE_URL = "https://api.movie.search.nomoredomains.sbs";

function getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}`);
}

export const register = (password, email, name) => {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email, name }),
    }).then((res) => {
      return getResponse(res);
    });
};

