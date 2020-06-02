import { combineReducers } from 'redux'
import users from './user';
import teams from './team';
import auth from './auth';
import session from './session';

const app = combineReducers({
  users,
  teams,
  auth,
  session
});

export default app;