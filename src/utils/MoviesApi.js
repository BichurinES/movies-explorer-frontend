import { BEATFILM_MOVIES_API_BASE_URL } from './constants';

class MoviesApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  getData() {
    return fetch(this._baseUrl, { method: 'GET' })
      .then((res) => res.json())
  }
}

const moviesApi = new MoviesApi(BEATFILM_MOVIES_API_BASE_URL)
export default moviesApi;
