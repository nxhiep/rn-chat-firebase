import * as types from './actionTypes'

const initialState = {
  channels: null,
  error: '',
  loading: false
}

const channel = (state = initialState, action) => {
  // console.log('111111111111 action', action, 'state', state);
  switch(action.type) {
    case types.GET_CHANNEL_LOADING:
      return { ...state, loading: true, error: '' }
    case types.GET_CHANNEL_SUCCESS:
      return { ...state, channels: action.channels, loading: false, error: '' }
    case types.GET_CHANNEL_ERROR:
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}

export default channel
