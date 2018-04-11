import * as types from './actionTypes'
import firebaseService from '../../services/firebase'
import * as API from '../../configs/api'
import * as CipherDES from '../../configs/CipherDES'
import { AsyncStorage} from 'react-native'

export const restoreSession = () => {
  return (dispatch) => {
    dispatch(sessionRestoring())
    AsyncStorage.getItem("user").then((user) => {
      var currentUser = JSON.parse(user);
      console.log('currentUser', currentUser)
      dispatch(sessionSuccess(currentUser))
    }).done();

    // let unsubscribe = firebaseService.auth()
    //   .onAuthStateChanged(user => {
    //     if (user) {
    //       user.id = 893132123324;
    //       // console.log('restoreSession', user)
    //       dispatch(sessionSuccess(user))
    //       unsubscribe()
    //     } else {
    //       dispatch(sessionLogout())
    //       unsubscribe()
    //     }
    //   })
  }
}

export const loginUser = (account, password) => {
  return (dispatch) => {
    dispatch(sessionLoading())
    console.log('password 111', password)
    password = CipherDES.encryptPassword(account, password);
    console.log('password 222', password)
    var url = API.URL_LOGIN + '?account=' + account + '&password=' + password;
    console.log('loginUser', url)
    fetch(url)
    .then((response) => (response.json()))
    .then(function(json){
      console.log('login success', json)
      if(json.loginFailedReason == 0){
        AsyncStorage.setItem("user", JSON.stringify(json), function(){
          dispatch(sessionSuccess(json))
        });
      } else {
        dispatch(sessionError('login account failed'))
      }
      // subscribe()
    })
    .catch(function(error){
      dispatch(sessionError(error.message))
      // unsubscribe()
    })
    // firebaseService.auth()
    //   .signInWithEmailAndPassword(account, password)
    //   .catch(error => {
    //     dispatch(sessionError(error.message))
    //   })

    // let unsubscribe = firebaseService.auth()
    //   .onAuthStateChanged(user => {
    //     if (user) {
    //       user.id = 893132123324;
    //       dispatch(sessionSuccess(user))
    //       unsubscribe()
    //     }
    //   })
  }
}

export const signupUser = (email, password) => {
  return (dispatch) => {
    // dispatch(sessionLoading())

    // firebaseService.auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .catch(error => {
    //     dispatch(sessionError(error.message));
    //   })

    // let unsubscribe = firebaseService.auth()
    //   .onAuthStateChanged(user => {
    //     if (user) {
    //       user.id = 893132123324;
    //       dispatch(sessionSuccess(user))
    //       unsubscribe()
    //     }
    //   })
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(sessionLoading())
    AsyncStorage.removeItem('user', function(error){
      console.log('AsyncStorage removeItem error ', error)
      if(error){
        dispatch(sessionError(error.message))
      } else {
        dispatch(sessionLogout())
      }
    });
    // firebaseService.auth()
    //   .signOut()
    //   .then(() => {
    //     dispatch(sessionLogout())
    //   })
    //   .catch(error => {
    //     dispatch(sessionError(error.message))
    //   })
  }
}

const sessionRestoring = () => ({
  type: types.SESSION_RESTORING
})

const sessionLoading = () => ({
  type: types.SESSION_LOADING
})

const sessionSuccess = user => ({
  type: types.SESSION_SUCCESS,
  user
})

const sessionError = error => ({
  type: types.SESSION_ERROR,
  error
})

const sessionLogout = () => ({
  type: types.SESSION_LOGOUT
})
