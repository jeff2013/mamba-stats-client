import { combineReducers } from 'redux'
import users from './user';
import teams from './team';
import auth from './auth';
import session from './session';
import game from './game';

const app = combineReducers({
  users,
  teams,
  auth,
  session,
  game
});

export default app;