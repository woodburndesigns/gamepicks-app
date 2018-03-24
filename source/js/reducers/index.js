import { combineReducers } from 'redux';

import session from './sessionReducer';
import users from './userReducer';
import teams from './teamReducer';
import picks from './pickReducer';
import games from './gameReducer';
import standings from './standingReducer';

const reducers = combineReducers({
  session,
  users,
  teams,
  picks,
  games,
  standings,
});

export default reducers;
