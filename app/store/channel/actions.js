import * as types from './actionTypes'
import * as API from '../../configs/api'

export const getChannels = () => {
  return (dispatch) => {
    // dispatch(loadingChannel())
    // TODO: get api channels
    console.log('getChannels start');
    fetch(API.URL_GET_CHANNEL)
    .then((response) => response.json())
    .then(function(json) {
      console.log('get api channels', json);
      dispatch(loadedChannel(json));
    })
    .catch(function(error){
      console.log('get api channels error', error);
      dispatch(loadChannelError(error.message));
    })
  }
}

const loadingChannel = () => ({
  type: types.GET_CHANNEL_LOADING
})

const loadedChannel = (channels) => ({
  type: types.GET_CHANNEL_SUCCESS,
  channels
})

const loadChannelError = (error) => ({
  type: types.GET_CHANNEL_ERROR,
  error
})