/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import decode from 'jwt-decode';

const TOKEN_REFRESH_INTERVAL = 300000;
let timeout = null;

export default class AuthHelperMethods {
  login(username, password) {
    return this.fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(res => {
        this.setToken(res.access_token, res.refresh_token);
        return Promise.resolve(res);
      })
      .then(() => {
        this.refreshableFetch();
      });
  }

  signup(username, password) {
    return this.fetch('http://localhost:5000/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    }).then(res => {
      console.log('----res ', res);
      return Promise.resolve(res);
    });
  }

  loggedIn() {
    const accessToken = this.getAccessToken();
    return !!accessToken && !this.isTokenExpired(accessToken);
  }

  isTokenExpired(accessToken) {
    try {
      const decoded = decode(accessToken);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if accessToken is expired.
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  setToken(accessToken, refreshToken) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  logout() {
    this.fetch('http://localhost:5000/logout/access', {
      method: 'POST',
    }).then(() => {
      this.fetch(
        'http://localhost:5000/logout/refresh',
        {
          method: 'POST',
        },
        true,
      ).then(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      });
    });
  }

  getConfirm() {
    const answer = decode(this.getAccessToken());
    console.log('Recieved answer!');
    return answer;
  }

  fetch(url, options, authorization) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (this.loggedIn()) {
      if (authorization) {
        headers.Authorization = `Bearer ${this.getRefreshToken()}`;
      } else {
        headers.Authorization = `Bearer ${this.getAccessToken()}`;
      }
    }

    return fetch(url, {
      headers,
      ...options,
    })
      .then(this._checkStatus)
      .then(response => response.json());
  }

  _checkStatus(response) {
    console.log('status--', response);
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  refreshableFetch() {
    clearTimeout(timeout);
    timeout = setTimeout(() => this.refreshableFetch(), TOKEN_REFRESH_INTERVAL);
    return this.fetch(
      'http://localhost:5000/token/refresh',
      {
        method: 'POST',
      },
      true,
    ).then(res => {
      console.log('refresh----res ', res);
      const refreshToken = this.getRefreshToken();
      this.setToken(res.access_token, refreshToken); // Setting the accessToken in localStorage
    });
  }
}
