import { MAIN_API_SETTINGS } from './constants';

class MainApi {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _createRequest(url, options) {
    options.headers = this.headers;
    options.credentials = 'include';
    return fetch(this.baseUrl + url, options)
      .then((res) => {
        return res.json()
          .then((obj) => {
            obj.status = res.status;
            return obj;
          })
      })
  }

  getProfile() {
    return this._createRequest('/users/me', { method: 'GET' })
  }

  changeProfile(data) {
    return this._createRequest('/users/me', { method: 'PATCH', body: JSON.stringify(data) })
  }

  getSavedMovies() {
    return this._createRequest('/movies', { method: 'GET' });
  }

  saveMovie(data) {
    return this._createRequest('/movies', { method: 'POST', body: JSON.stringify(data) });
  }

  deleteMovie(id) {
    return this._createRequest('/movies/' + id, { method: 'DELETE' });
  }

  register(data) {
    return this._createRequest('/signup', { method: 'POST', body: JSON.stringify(data) });
  }

  login(data) {
    return this._createRequest('/signin', { method: 'POST', body: JSON.stringify(data) });
  }

  logout() {
    return this._createRequest('/signout', { method: 'POST' });
  }
}

const mainApi = new MainApi(MAIN_API_SETTINGS);
export default mainApi;
