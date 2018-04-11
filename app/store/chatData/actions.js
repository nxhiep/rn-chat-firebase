import * as types from './actionTypes'
import * as API from '../../configs/api'

export const loadMessages = (userId, friendId) => {
  return (dispatch) => {
    const url = 'https://deploy-temp.appspot.com/get-conversation?userId='+userId+'&friendId='+friendId;
    dispatch(loadingMessages())
    fetch(url)
    .then((response) => response.json())
    .then(function(json){
      console.log('loadMessagesSuccess', json)
      dispatch(loadedMessagesSuccess(json))
    })
    .catch(function(error){
      dispatch(loadedMessagesError(error.message))
    })
  }
}

const loadedMessagesSuccess = (conversation) => ({
  type: types.LOADED_MESSAGES_SUCCESS,
  conversation
})

const loadingMessages = () => ({
  type: types.LOADING_MESSAGES
})

const loadedMessagesError = error => ({
  type: types.LOADED_MESSAGES_ERROR,
  error
})
