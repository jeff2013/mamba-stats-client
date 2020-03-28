import { combineReducers } from 'redux'
import users from './user';
import teams from './team';

const app = combineReducers({
  users,
  teams
});

export default app;