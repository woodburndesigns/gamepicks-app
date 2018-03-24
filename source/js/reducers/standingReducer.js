const initialState = {
  loading: false,
  error: null,
  standings: [],
}

const gameReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'STANDINGS_LOADING': {
      state = {
        ...state, 
        loading: true,
        error: null,
      }

      break;
    }
    case 'STANDINGS_ADD_STANDINGS': {
      state = {
        ...state,
        loading: false,
        error: null,
        standings: action.payload,
      }

      break;
    }

    case 'STANDINGS_FETCH_ERROR': {
      state = {
        ...state,
        loading: false,
        error: action.payload,
      }

      break;
    }
  }

  return state;
}

export default gameReducer;