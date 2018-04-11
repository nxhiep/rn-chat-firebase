import * as types from './actionTypes'

const initialState = {
  users: null,
  loadingUsers: false,
  errorUsers: ''
}

const user = (state = initialState, action) => {
  // console.log('111111111111 action', action, 'state', state);
  switch(action.type) {
    case types.GET_USERS_LOADING:
      return { ...state, loadingUsers: true}
    case types.GET_USERS_SUCCESS:
      return { ...state, users: action.users, loadingUsers: false}
    case types.GET_USERS_ERROR:
      return { ...state, loadingUsers: false, errorUsers: action.error }
    default:
      return state
  }
}

export default user
