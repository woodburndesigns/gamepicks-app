import api from '../helpers/api';

export function fetchSession() {
  return function(dispatch) {
    api.sessions.get()
      .then((res) => {
        dispatch(addUser(res.body));
      })
      .catch((res) => {
        dispatch({ type: 'SESSION_FETCH_ERROR', payload: false });
      });
  };
};

export function registerSession(payload) {
  return function(dispatch) {
    api.register.create(payload)
      .then((res) => {
        dispatch(addUser(res.body));
      })
      .catch((res) => {
        dispatch(registrationError(res.error.message));
      });
  }
};

export function createSession(payload) {
  return function(dispatch) {
    api.sessions.create(payload)
      .then((res) => {
        dispatch(addUser(res.body));
      })
      .catch((res) => {
        dispatch(loginError(res.error.message));
      });
  }
};

export function destroySession() {
  return function(dispatch) {
    api.sessions.destroy()
      .then((res) => {
        dispatch({ type: 'SESSION_DESTROY' })
      })
      .catch((res) => {
        dispatch({ type: 'SESSION_DESTROY_ERROR', error: res.error.message });
      })
  }
}

export function addUser(user) {
  return { 
    type: 'SESSION_ADD_USER', 
    payload: user,
  }
}

export function loginError(payload) {
  return {
    type: 'SESSION_CREATE_ERROR',
    payload: payload, 
  }
}

export function registrationError(payload) {
  return {
    type: 'SESSION_REGISTRATION_ERROR',
    payload: payload, 
  }
}