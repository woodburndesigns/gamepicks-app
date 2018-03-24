import api from '../helpers/api';

export function fetchGames() {
  return function(dispatch) {
    dispatch({type: 'GAMES_LOADING' });

    api.games.get()
      .then((res) => {
        dispatch(addGames(res.body));
      })
      .catch((res) => {
        dispatch({ type: 'GAMES_FETCH_ERROR', payload: false });
      });
  };
};

export function addGames(games) {
  return { 
    type: 'GAMES_ADD_GAMES', 
    payload: games,
  }
}

export function changeWeek(week) {
  return { 
    type: 'GAMES_CHANGE_WEEK', 
    payload: week,
  }
}