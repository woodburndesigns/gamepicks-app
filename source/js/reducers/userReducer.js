const initialState = {
  processing: false,
  error: null,
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'USER_CREATE_ERROR': {
      state = {
        ...state ,
        processing: false,
        error: action.payload,
      }

      break;
    }
  }

  return state;
}

export default userReducer;