const initialState = {
  loading: false,
  error: null,
  picks: [],
}

const pickReducer = (state = {}, action) => {

  switch(action.type) {
    case 'PICKS_SELECT': {
      state = {
        ...state,

      }
      break;
    }
  }

  return state;
}

export default pickReducer;