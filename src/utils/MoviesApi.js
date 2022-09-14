class ApiMovies {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
    }

    _checkReply(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`${res.status} ${res.statusText}`);
        }
    }

    getMovies() {
        const newUrl = this._baseUrl;
        return fetch(newUrl, {
          method: 'GET',
        }).then(this._checkReply);
    }

}

const moviesApi = new ApiMovies({
    baseUrl: ' https://api.nomoreparties.co/beatfilm-movies',
});

export default moviesApi;