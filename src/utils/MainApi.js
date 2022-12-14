class Api {
    constructor({ baseUrl, headers }) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    _checkReply(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`${res.status} ${res.statusText}`);
        }
    }

    getUserInfo(token) {
        const newUrl = this._baseUrl + '/users/me';
        return fetch(newUrl, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then(this._checkReply);
    }

    updateUserInfo({ name, email }) {
        const newUrl = this._baseUrl + '/users/me';
        return fetch(newUrl, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ name, email }),
        }).then(this._checkReply);
    }

    saveMovie(movie) {
        const newUrl = this._baseUrl + '/movies';
        return fetch(newUrl, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(movie),
        }).then(this._checkReply);

    }

    getMovies(token) {
        const newUrl = this._baseUrl + '/movies';
        return fetch(newUrl, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then(this._checkReply);
    }

    deleteMovie(movieId){
        const newUrl = this._baseUrl + `/movies/${movieId}`;
        return fetch(newUrl, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._checkReply);

    }

}

const api = new Api({
    baseUrl: 'https://api.movie.search.nomoredomains.sbs',
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
});

export default api;