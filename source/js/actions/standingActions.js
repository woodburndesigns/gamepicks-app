import api from '../helpers/api';

export function fetchStandings() {
  return function(dispatch) {
    dispatch({type: 'STANDINGS_LOADING' });

    api.standings.get()
      .then((res) => {
        dispatch({ type: 'STANDINGS_ADD_STANDINGS', payload: res.body });
      })
      .catch((res) => {        
        dispatch({ type: 'STANDINGS_FETCH_ERROR', payload: res.error });
      });
  };
};