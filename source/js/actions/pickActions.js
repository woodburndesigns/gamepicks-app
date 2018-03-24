import api from '../helpers/api';

/*
export function fetchPicks() {
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
*/

export function addPicks(picks) {
  return { 
    type: 'PICKS_ADD_PICKS', 
    payload: picks,
  }
}

export function makePick(game, team) {
  return { 
    type: 'PICKS_SELECT', 
    payload: { game, team },
  }
}