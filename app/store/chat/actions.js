import * as types from './actionTypes'
import * as API from '../../configs/api'
import firebaseService from '../../services/firebase'
import * as MyFireBase from '../../services/MyFireBase'

const FIREBASE_DATABASE = firebaseService.database()
const FIREBASE_REF_MESSAGES = firebaseService.database().ref('Messages')
const FIREBASE_REF_MESSAGES_LIMIT = 20

export const sendMessage = (conversation, channel, currentUser, friend, message) => {
  return (dispatch) => {
    dispatch(chatMessageLoading())
    // console.log('sendMessage', conversation, 'currentUser', currentUser, 'message', message);
    const data = {
      parentId: conversation.id,
      userId: currentUser.id,
      type: 1,
      userName: currentUser.name,
      content: message,
      imageURL: "",
      status: 0,
    };

    var params = Object.keys(data).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&');

    const urlSend = channel.id + '/' + friend.id + '/channel';
    console.log('sendDataChat', data)
    MyFireBase.setUserId(currentUser.id);
    MyFireBase.sendDataChat(urlSend, message, 1, function(data){
      console.log('sendDataChat', data)
    })

    const url = API.URL_SET_DISCUSSION + '?' + params;
    // console.log('insert discussion, params', params, 'data', data, 'string json', JSON.stringify(data), '\nurl', url)
    
    fetch(url)
    .then((response) => response.json())
    .then(function(json){
      var discussions = conversation.discussions ? conversation.discussions : [];
      discussions.push(json)
      conversation.discussions = discussions;
      dispatch(chatMessageSuccess(conversation))
    }).catch(function(error){
      dispatch(chatMessageError())
    })
  }
}

export const updateMessage = text => {
  return (dispatch) => {
    // TODO: add status typing to firebase => typing function
    dispatch(chatUpdateMessage(text))
  }
}

const chatMessageLoading = () => ({
  type: types.CHAT_MESSAGE_LOADING
})

const chatMessageSuccess = () => ({
  type: types.CHAT_MESSAGE_SUCCESS
})

const chatMessageError = error => ({
  type: types.CHAT_MESSAGE_ERROR,
  error
})

const chatUpdateMessage = text => ({
  type: types.CHAT_MESSAGE_UPDATE,
  text
})