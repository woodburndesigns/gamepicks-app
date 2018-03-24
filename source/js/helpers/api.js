import request from 'superagent';
import Promise from 'bluebird';
import { browserHistory } from 'react-router';

const api = {};

function apiRoot(uri) {
  let url = 'http://localhost:3001';

  if (uri) {
    url += uri;
  }

  return url;
}

function responseHandler(reject, resolve, err, res, skipNotFound = false) {
  const error = err || res.error;
/*
  if (error && error.status === 404 && !skipNotFound) {    
    return browserHistory.push('/404');
  }
*/

  return error ? reject(res) : resolve(res);
}

api.register = {
  create(user) {
    return new Promise((resolve, reject) => {
      request
        .post(apiRoot('/register'))
        .withCredentials()
        .send(user)
        .end((err, res) => {
          responseHandler(reject, resolve, err, res);
        });
    });
  },
}

api.sessions = {
  url(id) {
    let uri = '/sessions';

    if (id) {
      uri += `/${id}`;
    }

    return apiRoot(uri);
  },

  create(session) {
    return new Promise((resolve, reject) => {
      request
        .post(this.url())
        .withCredentials()
        .send(session)
        .end((err, res) => {
          responseHandler(reject, resolve, err, res);
        });
    });
  },

  get() {
    return new Promise((resolve, reject) => {
      request
        .get(this.url())
        .withCredentials()
        .end((err, res) => {
          responseHandler(reject, resolve, err, res);
        });
    });
  },

  destroy() {
    return new Promise((resolve, reject) => {
      request
        .del(this.url())
        .withCredentials()
        .end((err, res) => {
          responseHandler(reject, resolve, err, res);
        });
    });
  },
};

api.games = {
  url(id) {
    let uri = '/games';

    if (id) {
      uri += `/${id}`;
    }

    return apiRoot(uri);
  },

  get() {
    return new Promise((resolve, reject) => {
      request
        .get(this.url())
        .withCredentials()
        .end((err, res) => {
          responseHandler(reject, resolve, err, res);
        });
    });
  },
};

api.standings = {
  url(id) {
    let uri = '/standings';

    if (id) {
      uri += `/${id}`;
    }

    return apiRoot(uri);
  },

  get() {
    return new Promise((resolve, reject) => {
      request
        .get(this.url())
        .withCredentials()
        .end((err, res) => {
          responseHandler(reject, resolve, err, res);
        });
    });
  },
};

export default api;
