import * as types from './actionTypes'
import * as API from '../../configs/api'
import firebaseService from '../../services/firebase'

const FIREBASE_REF_MESSAGES = firebaseService.database().ref('Messages')
const FIREBASE_REF_MESSAGES_LIMIT = 20

export const getUsers = (channelId) => {
  return (dispatch) => {
    console.log('getUsers', channelId)
    dispatch(loadingUsers())
    fetch(API.URL_GET_USERS + '?channelId=' + channelId)
    .then((response) => response.json())
    .then(function(json) {
      console.log('loadedUsers', json)
      dispatch(loadedUsers(json));
    })
    .catch(function(error){
      console.log('loadUsersError:', error)
      dispatch(loadUsersError(error.message));
    })
  }
}

const loadingUsers = () => ({
  type: types.GET_USERS_LOADING
})

const loadedUsers = (users) => ({
  type: types.GET_USERS_SUCCESS,
  users
})

const loadUsersError = (error) => ({
  type: types.GET_USERS_ERROR,
  error
})