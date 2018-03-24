import moment from 'moment';

const initialState = {
  loading: false,
  selectedWeek: null,
  currentWeek: null,
  games: [],
}

const gameReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GAMES_LOADING': {
      state = {
        ...state, 
        loading: true,
      }

      break;
    }
    case 'GAMES_ADD_GAMES': {
      const games = action.payload;
      const today = moment();
      let currentWeek;
      let weeks = {};

      games.forEach(game => {
        if (weeks[game.week] === undefined) {
          const thisWeeksGames = games.filter(g => (g.week === game.week));
          
          weeks[game.week] = {
            start: moment(thisWeeksGames[0].date),
            end: moment(thisWeeksGames[thisWeeksGames.length - 1].date),
          }
        }
      });

      Object.keys(weeks).forEach(w => {
        const week = parseInt(w, 10);
        const firstGame = weeks[week - 1] ? weeks[week - 1].end : weeks[week].start;
        const lastGame = weeks[week].start;

        if (today > firstGame && today < lastGame && !currentWeek && lastGame !== null) {
          currentWeek = week;
        }
      })
      
      state = {
        ...state,
        loading: false,
        currentWeek,
        games,
      }

      break;
    }

    case 'GAMES_CHANGE_WEEK': {
      state = {
        ...state,
        selectedWeek: action.payload,
      }

      break;
    }
  }

  return state;
}

export default gameReducer;