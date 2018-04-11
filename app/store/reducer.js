import { combineReducers } from 'redux'

import session from './session'
import chat from './chat'
import channel from './channel'
import user from './user';
import chatData from './chatData';

export default combineReducers({
  session,
  chat,
  channel,
  user,
  chatData
})
