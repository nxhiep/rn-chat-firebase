import * as types from './actionTypes'

const initialState = {
  conversation: {},
  loadMessagesError: null,
  loaded: false
}

const chatData = (state = initialState, action) => {
  // console.log('action', action)
  switch(action.type) {
    case types.LOADED_MESSAGES_SUCCESS:
      return { ...state, loaded: true, conversation: action.conversation }
    case types.LOADED_MESSAGES_ERROR:
      return { ...state, loaded: true, loadMessagesError: action.error }
    case types.LOADING_MESSAGES:
      return { ...state, loaded: false }
    default:
      return state
  }
}

export default chatData
