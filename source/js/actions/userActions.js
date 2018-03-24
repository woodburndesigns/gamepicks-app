import api from '../helpers/api';

export function registrationError(payload) {
  return {
    type: 'USER_CREATE_ERROR',
    payload: payload, 
  }
}