import { combineReducers } from 'redux'
import users from './user'

const app = combineReducers({
  users
});

export default app;