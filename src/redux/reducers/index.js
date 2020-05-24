import { combineReducers } from 'redux'
import users from './user';
import teams from './team';
import auth from './auth';

const app = combineReducers({
  users,
  teams,
  auth
});

export default app;