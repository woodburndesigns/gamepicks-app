const initialState = {
  isAuthenticated: false,
  loginError: null,
  registrationError: null,
  user: {},
};

const sessionReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SESSION_FETCH_ERROR': {
      state = {
        ...state,
        isAuthenticated: false,
      }

      break;
    }
    
    case 'SESSION_ADD_USER': {
      state = {
        ...state,
        isAuthenticated: true,
        loginError: null,
        registrationError: null,
        user: action.payload
      }

      break;
    }

    case 'SESSION_CREATE_ERROR': {
      state = {
        ...state ,
        isAuthenticated: false,
        loginError: action.payload,
        registrationError: null,
      }

      break;
    }

    case 'SESSION_REGISTRATION_ERROR': {
      state = {
        ...state ,
        isAuthenticated: false,
        loginError: null,
        registrationError: action.payload,
      }

      break;
    }

    case 'SESSION_DESTROY': {
      state = initialState;
    }
  }

  return state;
}

export default sessionReducer;