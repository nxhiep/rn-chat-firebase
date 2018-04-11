import * as types from './actionTypes'

const initialState = {
  sending: false,
  sendingError: null,
  message: '',
}

const chat = (state = initialState, action) => {
  // console.log('action', action)
  switch(action.type) {
    case types.CHAT_MESSAGE_LOADING:
      return { ...state, sending: true, sendingError: null }
    case types.CHAT_MESSAGE_ERROR:
      return { ...state, sending: false, sendingError: action.error }
    case types.CHAT_MESSAGE_SUCCESS:
      return { ...state, message: '', sending: false, sendingError: null }
    case types.CHAT_MESSAGE_UPDATE:
      return { ...state, message: action.text, sending: false }
    default:
      return state
  }
}

export default chat
